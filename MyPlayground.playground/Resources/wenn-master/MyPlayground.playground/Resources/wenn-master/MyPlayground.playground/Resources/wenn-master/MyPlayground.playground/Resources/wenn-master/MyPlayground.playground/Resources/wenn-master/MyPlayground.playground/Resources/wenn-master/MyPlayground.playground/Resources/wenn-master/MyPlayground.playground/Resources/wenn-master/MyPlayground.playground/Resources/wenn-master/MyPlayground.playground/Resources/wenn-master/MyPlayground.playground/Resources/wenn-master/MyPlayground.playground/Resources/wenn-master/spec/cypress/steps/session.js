Cypress.Commands.add('signInWithUI', (email, password) => {
  cy.visit('/users/sign_in')
  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password)
  cy.get('input[type=submit]').click()
})
