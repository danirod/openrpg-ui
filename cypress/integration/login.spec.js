describe('Login and authentication', () => {
  it('Can log in', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: '/api/auth/sessions',
      response: { token: 'xx' }
    })
    cy.route('/api/auth/session', 'fixture:session.json').as('session')

    /* We are redirected to login. */
    cy.visit('/')
    cy.contains('Iniciar sesión')
    cy.url().should('include', 'login')

    /* We can fill the user data. */
    cy.get('form').within(() => {
      cy.get('#email').type('test@example.com')
      cy.get('#password').type('123456')
      cy.contains('Iniciar sesión').click()
    })

    /* We are not redirected to login anymore. */
    cy.url().should('not.include', 'login')
  })
})
