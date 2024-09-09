describe('Forgot password', () => {
  it('is successful', () => {
    const email = 'user@example.com'

    cy.visit('/#/users/forgot_password')
    cy.get('[data-testid=email]')
      .type(email)
      .type('{enter}')

    cy.url().should('include', '/#/users/sign_in')
    //todo: test that a message was shown
  })

  it('does nothing if no email was entered', () => {
    cy.visit('/#/users/forgot_password')
    cy.get('[data-testid=email]')
      .type('{enter}')

    expect(cy.contains('Email is required'))
    cy.url().should('include', '/#/users/forgot_password')
  })
})
