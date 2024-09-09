Sentry.init do |config|
  config.dsn = 'https://f7cd1dafe1cb4cd593378e5a6608988c@o4505533327343616.ingest.sentry.io/4505533404413952'
  config.breadcrumbs_logger = [:active_support_logger, :http_logger]
  config.enabled_environments = %w[production staging]
  # Set traces_sample_rate to 1.0 to capture 100%
  # of transactions for performance monitoring.
  # We recommend adjusting this value in production.
  config.traces_sample_rate = 1.0
  # or
  config.traces_sampler = lambda do |context|
    true
  end
end
