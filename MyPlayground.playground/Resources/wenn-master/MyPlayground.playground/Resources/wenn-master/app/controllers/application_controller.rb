class ApplicationController < ActionController::Base
  include Api::V1::RenderHelper

  protect_from_forgery unless: -> { request.format.json? }

  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render_error(nil, message: "Record not found", status: :not_found)
  end

  rescue_from CanCan::AccessDenied do |exception|
    render_error(nil, message: exception.message, status: :forbidden)
  end

  rescue_from ActionController::ParameterMissing do |exception|
    render_error(nil, message: exception.message || "Parameter missing")
  end

  before_action do
    user = current_user || current_admin_user
    Sentry.set_user({
      id: user&.to_global_id&.to_s,
      email: user&.email,
      username: user.respond_to?(:full_name) ? user&.full_name : nil,
    }) if user
  rescue => ex
    Rails.logger.warn "Unable to set Sentry user: #{ex.message}"
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_in) do |user|
      user.permit(
        :email,
        :password,
        :registration_token)
    end

    devise_parameter_sanitizer.permit(:sign_up) do |user|
      user.permit(
        :first_name,
        :last_name,
        :email,
        :password,
        :password_confirmation)
    end
  end
end
