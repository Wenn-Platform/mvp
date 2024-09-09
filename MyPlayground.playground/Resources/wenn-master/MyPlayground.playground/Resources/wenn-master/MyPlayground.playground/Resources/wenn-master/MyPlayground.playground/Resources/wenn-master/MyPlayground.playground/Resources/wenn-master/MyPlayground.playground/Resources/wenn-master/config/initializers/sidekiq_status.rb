expiration = 14.days

Sidekiq.configure_client do |config|
  Sidekiq::Status.configure_client_middleware config, expiration: expiration.to_i
end

Sidekiq.configure_server do |config|
  Sidekiq::Status.configure_server_middleware config, expiration: expiration.to_i
  Sidekiq::Status.configure_client_middleware config, expiration: expiration.to_i
end