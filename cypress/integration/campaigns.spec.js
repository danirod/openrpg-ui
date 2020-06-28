describe('Campaigns', () => {
  it('not logged in - redirects to login', () => {
    cy.visit('/campaigns')
    cy.contains('Iniciar sesión')
  })

  it('logged in - create flow', () => {
    cy.server()
    cy.setCookie('auth.strategy', 'local')
    cy.setCookie('auth._token.local', 'Bearer xxx')
    cy.route('/api/auth/session', 'fixture:session.json').as('session')

    cy.visit('/campaigns/create')

    /* Fail flow first. */
    cy.route({
      method: 'POST',
      url: '/api/campaigns',
      status: 422,
      response: {
        message: 'Create error',
        errors: {
          title: ['The title has already been taken']
        }
      }
    }).as('post')
    cy.get('#campaign_form').within(() => {
      cy.get('#campaign_title').type('La campaña de los valientes')
      cy.get('#campaign_description').type('La campaña de los grandes')
      cy.contains('Crear campaña').click()
    })
    cy.wait('@post').its('requestBody').should('deep.equal', {
      title: 'La campaña de los valientes',
      description: 'La campaña de los grandes'
    })
    cy.contains('The title has already been taken')

    /* Successful flow then. */
    cy.route({
      method: 'POST',
      url: '/api/campaigns',
      status: 201,
      response: {
        message: 'Created correctly'
      }
    }).as('post')
    cy.contains('Crear campaña').click()
    cy.wait('@post').its('requestBody').should('deep.equal', {
      title: 'La campaña de los valientes',
      description: 'La campaña de los grandes'
    })
    cy.contains('Created correctly')
  })

  it('logged in - update flow', () => {
    cy.server()
    cy.setCookie('auth.strategy', 'local')
    cy.setCookie('auth._token.local', 'Bearer xxx')
    cy.route('/api/auth/session', 'fixture:session.json').as('session')

    cy.route('/api/campaigns/1', 'fixture:campaign.json').as('campaign')
    cy.visit('/campaigns/1')
    cy.contains('Una campaña')
    cy.contains('Una descripción')
    cy.contains('Editar').click()

    /* Now I am in the update screen. */
    cy.route({
      method: 'PUT',
      url: '/api/campaigns/1',
      status: 200,
      response: {
        message: 'Updated correctly'
      }
    }).as('update')

    cy.get('#campaign_form').within(() => {
      cy.get('#campaign_title').clear().type('Otra campaña')
      cy.get('#campaign_description').clear().type('Una campaña que no sé')
      cy.contains('Actualizar campaña').click()
    })

    cy.wait('@update').its('requestBody').should('deep.equal', {
      id: 1,
      title: 'Otra campaña',
      description: 'Una campaña que no sé'
    })
    cy.contains('Updated correctly')
  })

  it('logged in - delete flow', () => {
    cy.server()
    cy.setCookie('auth.strategy', 'local')
    cy.setCookie('auth._token.local', 'Bearer xxx')
    cy.route('/api/auth/session', 'fixture:session.json').as('session')

    cy.route('/api/campaigns?page=1', 'fixture:campaigns.json').as('campaigns')
    cy.route({
      method: 'DELETE',
      url: '/api/campaigns/1',
      status: 204,
      response: {}
    }).as('delete')

    cy.visit('/campaigns')

    /* I can click the destroy button of the existing campaign. */
    cy.contains('Una campaña')
      .parent('tr')
      .within(() => {
        cy.contains('Borrar').click()
      })

    /* I can confirm the deletion. */
    cy.get('#destroy-modal').within(() => {
      cy.contains('¡Vas a borrar la campaña Una campaña!')
      cy.contains('Borrar').click()
    })
    cy.wait('@delete')
  })
})
