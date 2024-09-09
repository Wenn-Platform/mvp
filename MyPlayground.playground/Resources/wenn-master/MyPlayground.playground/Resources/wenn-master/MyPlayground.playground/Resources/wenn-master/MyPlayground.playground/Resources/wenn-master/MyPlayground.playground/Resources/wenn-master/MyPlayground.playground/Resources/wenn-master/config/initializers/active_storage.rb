# if done during init without a to_prepare block, the `protect_from_forgery` will be re-added by some other code
# we could do it in Rails.application.config.after_intitialize but that does not work in development
ActiveSupport::Reloader.to_prepare do
  # rescue because spring makes this blow up in development if running rails console
  ActiveStorage::DirectUploadsController.skip_forgery_protection rescue nil
end
