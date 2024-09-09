## Development

Install the gem dependencies and then create & migrate your database:

```
bundle install
rails db:setup
```

You should now be able to run the server locally:

```
foreman start -f Procfile.dev
```

Visit the site at http://localhost:5200

## Tests

Before running Rails tests, be sure the test database is running, and migrate it:


### Rails

```
RAILS ENV=test bundle exec rake spec
```

### JavaScript

`yarn test`

Delete snapshots & rerun tests: `yarn test -u`

Generate code coverage report at `/coverage/lcov-report`: `yarn test --coverage`

### Integration/browser testing

First, run a rails server in test mode:

```
./bin/rails server -e test -p 5002 --pid=tmp/pids/server.test.pid
```

Then, run the integration tests:

```
yarn int
```

During development, it is recommended to run the powerful Cypress UI integration driver instead:

```
yarn int:open
```

Now, click on a spec to run it, or click "Run all specs"

You can control the test driver from the UI. See [Cypress documentation](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Is-Simple) for more info. If you want to inspect the database state during a test, use `rails c test`

## Background jobs

[Clear queue](https://stackoverflow.com/a/38672157):

```ruby
Sidekiq.redis { |conn| conn.flushdb }
require 'sidekiq/api'
Sidekiq::Queue.new.clear
```

```
bundle exec sidekiq --environment development -C config/sidekiq.yml
```

## Secrets

Run `EDITOR=vim rails credentials:edit` to edit the credentials file. See usages of `Rails.application.credentials` for examples.

Make sure to either `scp` the `config/master.key` file or set
the `RAILS_MASTER_KEY` environment variable in CI or deployment environments.

## Committing to the code base

Please squash your commits and rebase against master before putting up your code or
merging into the master branch.

Here's an [explanation of why](https://blog.carbonfive.com/2017/08/28/always-squash-and-rebase-your-git-commits/).

Additionally it makes it a lot easier to debug production problems using git history when it's not littered with merge commits.


## Health checks

For 200 response: `/health_checks`

and `/health_checks/all.json` for a breakdown in JSON format.
