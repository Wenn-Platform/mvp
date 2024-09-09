require File.expand_path('../production.rb', __FILE__)

Rails.application.configure do
  # Here override any defaults
  #config.serve_static_files = true

  config.default_url_options = {host: 'staging.wenn.io'}
  routes.default_url_options = {host: 'staging.wenn.io'}
  config.action_mailer.default_url_options = config.default_url_options
end
