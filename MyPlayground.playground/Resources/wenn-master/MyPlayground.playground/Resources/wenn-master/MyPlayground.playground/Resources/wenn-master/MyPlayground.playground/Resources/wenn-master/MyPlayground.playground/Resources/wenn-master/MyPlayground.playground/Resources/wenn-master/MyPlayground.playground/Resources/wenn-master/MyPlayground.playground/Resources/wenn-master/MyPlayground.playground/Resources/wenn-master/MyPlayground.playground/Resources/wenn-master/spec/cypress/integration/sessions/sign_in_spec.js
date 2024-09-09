describe('Sign in', () => {
  beforeEach(() =>
    cy.appFactories([
      ['create', 'user', { email: 'user@example.com'} ]
    ])
  )

  it('is successful', () => {
    cy.signInWithUI('user@example.com', 'password')
    cy.url().should('include', '/#')

    // FIXME
    // cy.window().then((window) =>
    //   expect(window.localStorage.getItem('token')).to.not.be.null
    // )
  })

  it('expires and requires a new sign in', () => {
    cy.signIn('user@example.com', 'password')

    cy.visit('/#')
    cy.url().should('include', '/#')

    cy.app('time_travel', '8.days.from_now')

    cy.visit('/users/sign_in')
    cy.url().should('include', '/users/sign_in')

    cy.signInWithUI('user@example.com', 'password')
    cy.url().should('include', '/users/sign_in')
  })
})
