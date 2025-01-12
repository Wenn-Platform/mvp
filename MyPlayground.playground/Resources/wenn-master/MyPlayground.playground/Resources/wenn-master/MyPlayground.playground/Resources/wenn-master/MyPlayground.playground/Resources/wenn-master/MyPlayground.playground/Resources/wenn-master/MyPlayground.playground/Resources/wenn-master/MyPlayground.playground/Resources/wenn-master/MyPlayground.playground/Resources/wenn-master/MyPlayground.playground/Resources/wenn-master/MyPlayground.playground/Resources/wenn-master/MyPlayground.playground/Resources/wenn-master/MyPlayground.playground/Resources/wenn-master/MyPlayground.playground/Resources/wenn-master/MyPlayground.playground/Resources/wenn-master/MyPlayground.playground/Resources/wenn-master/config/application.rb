require_relative 'boot'

require 'rails'
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
# require 'action_mailbox/engine'
# require 'action_text/engine'
require 'action_view/railtie'
require 'action_cable/engine'
require 'sprockets/railtie'
# require 'rails/test_unit/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Wenn
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Don't generate system test files.
    config.generators.system_tests = nil

    config.generators do |g|
      g.orm :active_record, primary_key_type: :uuid
      g.test_framework :rspec,
        fixtures:  true,
        view_specs:  false,
        helper_specs:  false,
        routing_specs:  false,
        controller_specs:  true,
        request_specs:  true
      g.fixture_replacement :factory_bot, dir:  'spec/factories'
    end

    config.cache_store = :redis_cache_store, { url: ENV['REDIS_URL'] }

    config.active_job.queue_adapter = :sidekiq
    
    config.active_storage.routes_prefix = '/api/v1'
    # ActiveStorage before catch all
    config.railties_order = [ActiveStorage::Engine, :main_app, :all]

    # https://stackoverflow.com/questions/71990425/rails-active-storage-keep-existing-files-uploads
    config.active_storage.replace_on_assign_to_many = false
  end
end
