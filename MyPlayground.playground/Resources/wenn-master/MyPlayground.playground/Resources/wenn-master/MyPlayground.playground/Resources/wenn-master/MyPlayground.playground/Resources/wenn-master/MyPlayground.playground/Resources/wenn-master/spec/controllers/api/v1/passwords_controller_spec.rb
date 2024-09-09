require 'rails_helper'

RSpec.describe Api::V1::PasswordsController, type: :request do

  before do
    Sidekiq::Worker.clear_all
  end

  describe "PUT #update" do
    context "unauthenticated" do
      def put_update_password(user_params = {})
        default_params = {
          reset_password_token: nil,
          password: 'heythere5',
          password_confirmation: 'heythere5'
        }

        put '/api/v1/users/password',
          params: {
            user: default_params.merge(user_params)
          }
      end

      it "successfully changes password" do
        raw, enc = Devise.token_generator.generate(User, :reset_password_token)
        @user = FactoryBot.create :user,
          reset_password_token: enc,
          reset_password_sent_at: Time.now.utc

        put_update_password(reset_password_token: raw)

        json = jsonify(response)

        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "POST #create" do
    context "unauthenticated" do
      def send_password(user_params = {})
        default_params = {
          email: Faker::Internet.email,
        }

        post '/api/v1/users/password',
          params: {
            user: default_params.merge(user_params)
          }
      end

      it "successfully sends password confirmation" do
        pending "Job test"

        @user = FactoryBot.create :user
        send_password(email: @user.email)

        json = jsonify(response)

        expect(job_in_queue?('reset_password_instructions')).to be(true)
        expect(response).to have_http_status(:success)
      end
    end
  end
end
