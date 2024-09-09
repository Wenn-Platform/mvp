# this is run by webpack-dev-server in dev mode, so cannot have
# dependencies on the Rails object (e.g. Rails.env), but Rails.env will
# be present when running rake webpacker:compile
frontend_config = YAML.load(
  ERB.new(
    File.read('config/frontend.yml')
  ).result
)[ENV["RAILS_ENV"] || Rails.env]

frontend_config&.each do |key, value|
  Webpacker::Compiler.env[key.upcase] = value.to_s
end
