// CypressDev: dont remove these command
Cypress.Commands.add('appCommands', function (body) {
  cy.log("APP: " + JSON.stringify(body))
  cy.request({
    method: 'POST',
    url: "/__cypress__/command",
    body: JSON.stringify(body),
    log: true,
    failOnStatusCode: true
  })
});

Cypress.Commands.add('app', function (name, command_options) {
  cy.appCommands({name: name, options: command_options})
});

Cypress.Commands.add('appScenario', function (name) {
  cy.app('scenarios/' + name)
});

Cypress.Commands.add('appEval', function (code) {
  cy.app('eval', code)
});

Cypress.Commands.add('appFactories', function (options) {
  cy.app('factory_bot', options)
});
// CypressDev: end

// The next is optional
beforeEach(() => {
  cy.app('clean') // have a look at cypress/app_commands/clean.rb
  cy.clearLocalStorage()
})

afterEach(() => {
  cy.app('time_travel', null)
})

// comment this out if you do not want to attempt to log additional info on test fail
Cypress.on('fail', (err, runnable) => {
  // allow app to generate additional logging data
  Cypress.$.ajax({
    url: '/__cypress__/command',
    data: JSON.stringify({name: 'log_fail', options: {error_message: err.message, runnable_full_title: runnable.fullTitle() }}),
    async: false,
    method: 'POST'
  });

  throw err;
});
