if defined?(DatabaseCleaner)
  DatabaseCleaner.strategy = :truncation
  DatabaseCleaner.clean

  Rails.logger.info "APPCLEANED" # used by log_fail.rb
else
  logger.warn "add database_cleaner or update clean_db"
end
