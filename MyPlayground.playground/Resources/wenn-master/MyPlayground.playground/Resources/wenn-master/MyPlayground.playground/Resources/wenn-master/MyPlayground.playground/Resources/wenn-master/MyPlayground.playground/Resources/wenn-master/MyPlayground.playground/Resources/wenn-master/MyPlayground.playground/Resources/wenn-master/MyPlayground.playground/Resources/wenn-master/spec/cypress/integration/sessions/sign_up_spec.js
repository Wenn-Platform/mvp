describe('Sign up', () => {
  it('is successful', () => {
    const email = 'user@example.com'
    const firstName = 'User'
    const lastName = 'Example'
    const password = 'password'

    cy.visit('/users/sign_up')
    cy.get('[data-testid=email]').type(email)
    cy.get('[data-testid=firstName]').type(firstName)
    cy.get('[data-testid=lastName]').type(lastName)
    cy.get('[data-testid=password]').type(password)
    cy.get('[data-testid=passwordConfirmation]').type(password)
      .type('{enter}')

    cy.url().should('include', '/#')
    // FIXME
    // cy.window().then((window) =>
    //   expect(window.localStorage.getItem('token')).to.not.be.null
    // )
  })
})
