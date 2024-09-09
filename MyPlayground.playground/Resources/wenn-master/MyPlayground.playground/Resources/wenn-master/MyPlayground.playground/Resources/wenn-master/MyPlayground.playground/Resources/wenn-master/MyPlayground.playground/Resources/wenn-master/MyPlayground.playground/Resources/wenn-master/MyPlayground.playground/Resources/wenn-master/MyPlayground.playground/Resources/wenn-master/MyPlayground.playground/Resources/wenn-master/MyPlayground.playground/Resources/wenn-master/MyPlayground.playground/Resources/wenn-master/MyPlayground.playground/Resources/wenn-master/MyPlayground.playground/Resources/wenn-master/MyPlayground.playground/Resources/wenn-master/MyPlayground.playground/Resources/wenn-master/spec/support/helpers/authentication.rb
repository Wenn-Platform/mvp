module Helpers
  module Authentication
    def sign_in_user(user = nil)
      @request.env["devise.mapping"] = Devise.mappings[:user]
      if !user
        user = FactoryBot.create(:user)
      end
      controller.instance_variable_set(:@current_user, nil)
      sign_in user

      user
    end

    def decode_header(response)
      token_from_request = response.headers['Authorization']&.split(' ')&.last
      return unless token_from_request

      secret = Rails.application.credentials[Rails.env.to_sym][:jwt_secret]
      JWT.decode(token_from_request, secret, true).first
    end
  end
end
