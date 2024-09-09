source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '~> 2.7.7'

gem 'rails', '~> 6.1'
gem 'blueprinter'
gem 'oj'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'webpacker', '~> 4.0'
# gem 'redis', '~> 4.0'

# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
gem 'activestorage-validator'
gem 'image_processing', '~> 1.2'

# activeadmin
gem 'activeadmin', '~> 2.9'
gem 'sassc-rails'

gem 'annotate'
gem 'database_cleaner'
gem 'sidekiq'
gem 'sidekiq-status'
gem 'cancancan'
gem 'devise'
gem 'devise-jwt', '0.6.0'

gem "sentry-ruby"
gem "sentry-rails"
gem 'aws-sdk-s3'

# gem 'stripe'
# gem 'stripe-ruby-mock', '~> 2.5.6', require: 'stripe_mock'

gem 'okcomputer'
gem 'silencer', '~> 1.0'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

group :development, :test do
  gem 'pry-rails'
end

group :development do
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'foreman'
end

group(:test) do
  gem 'rspec'
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'simplecov'
  gem 'capybara'
  gem 'cypress-on-rails'
  gem 'faker'
  gem 'timecop'
end

gem "mini_cache", "~> 1.1"
