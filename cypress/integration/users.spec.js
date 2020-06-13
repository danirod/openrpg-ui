describe('Users', () => {
  it('not logged in - redirects to login', () => {
    cy.visit('/users')
    cy.contains('Iniciar sesión')
  })

  it('logged in - E2E flow', () => {
    cy.server()
    cy.setCookie('auth.strategy', 'local')
    cy.setCookie('auth._token.local', 'Bearer xxx')
    cy.route('/api/auth/session', 'fixture:session.json').as('session')
    cy.route('/api/users', 'fixture:users.json').as('users')
    cy.route('/api/users/1', 'fixture:user.json').as('user')

    /* Can see users. */
    cy.visit('/users')
    cy.contains('Admin Fuckencio')
      .parent('tr')
      .within(() => {
        cy.contains('Ver').click()
      })

    /* Can detail users. */
    cy.contains('Usuario Admin Fuckencio')
    cy.contains('Nombre: Admin Fuckencio')

    /* Can edit users. */
    cy.contains('Editar').click()
  })
})
