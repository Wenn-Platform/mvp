# require 'rails_helper'
# require 'devise/jwt/test_helpers'

# RSpec.describe "Session", type: :request do
#   include ActiveSupport::Testing::TimeHelpers

#   describe "POST #create" do
#     def post_sign_in(user_params = {})
#       post '/api/v1/users/sign_in',
#         params: {
#           user: user_params
#       }
#     end

#     context "registered" do
#       before do
#         User.destroy_all

#         @password = 'heythere9'

#         @user = FactoryBot.create :user,
#           email: 'static_user@static.user.com',
#           password: @password,
#           password_confirmation: @password
#       end

#       it "is successful for a registered user" do
#         post_sign_in({ email: @user.email, password: @password })

#         json = jsonify(response)

#         expect(response).to have_http_status(:success)

#         token = decode_header(response)

#         sub = token['sub']

#         expect(sub).to be_present
#         expect(sub).to eq(@user.id)
#       end

#       it "is unsuccessful with incorrect parameters" do
#         @password = 'fail'

#         post_sign_in({ email: @user.email, password: @password })

#         json = jsonify(response)

#         expect(json['error']).to eq("Invalid Email or password.")
#         expect(response).to have_http_status(:unauthorized)
#       end

#       it "is unsuccessful if not confirmed within 7 days" do
#         @user.confirmed_at = nil
#         @user.confirmation_token = nil
#         @user.save

#         travel_to Date.today + 3.months do
#           post_sign_in({ email: @user.email, password: @password })
#           expect(response).to have_http_status(:unauthorized)
#         end
#       end
#     end

#     context "unregistered" do
#       before do
#         User.destroy_all

#         @password = 'heythere9'

#         @user = FactoryBot.create :user, :unregistered
#       end

#       def successful_login
#         post_sign_in({
#           email: @user.email,
#           registration_token: @user.registration_token
#         })

#         json = jsonify(response)

#         expect(response).to have_http_status(:success)

#         token = decode_header(response)

#         sub = token['sub']

#         expect(sub).to be_present
#         expect(sub).to eq(@user.id)
#       end

#       it "is successful for unregistered user with registration token" do
#         successful_login
#       end

#       it "is still successful if not confirmed within 7 days" do
#         travel_to Date.today + 3.months do
#           successful_login
#         end
#       end

#       it "is unsuccessful for unregistered user with no password" do
#         post_sign_in({ email: @user.email, password: "" })

#         json = jsonify(response)

#         expect(response).to have_http_status(:unauthorized)
#       end
#     end

#     context "DELETE #sign_out" do
#       it "signs the user out & blacklists their token" do
#         @user = FactoryBot.create :user

#         JwtBlacklist.destroy_all

#         post_sign_in({ email: @user.email, password: @password })

#         auth_headers = Devise::JWT::TestHelpers.auth_headers({}, @user)

#         delete '/api/v1/users/sign_out', headers: auth_headers

#         expect(JwtBlacklist.all.count).to eq(1)
#       end
#     end
#   end
# end
