# require 'rails_helper'
# require 'devise/jwt/test_helpers'

# RSpec.describe Api::V1::RegistrationsController, type: :request do
#   def post_sign_up(params: {}, url: '/api/v1/users', headers: {})
#     default_params = {
#       email: Faker::Internet.email,
#       first_name: Faker::Name.first_name,
#       last_name: Faker::Name.last_name,
#       password: 'heythere5',
#       password_confirmation: 'heythere5'
#     }

#     post url,
#       params: {
#         user: default_params.merge(params)
#       },
#       headers: headers
#   end

#   describe "POST #create" do
#     before(:each) do
#       User.destroy_all
#     end

#     context "registered" do
#       it "is successful" do
#         post_sign_up

#         json = jsonify(response)
#         token = decode_header(response)
#         user = User.first

#         expect(response).to have_http_status(:success)
#         expect(token).to be_present
#         expect(User.count).to eq(1)
#       end

#       it "fails if email is taken" do
#         @user = FactoryBot.create :user
#         post_sign_up(params: { email: @user.email })

#         json = jsonify(response)

#         expect(response).to have_http_status(:unprocessable_entity)
#         expect(json["error"]).to eq("Email has already been taken")
#         expect(User.count).to eq(1)
#       end

#       it "fails if passwords don't match" do
#         post_sign_up(params: {
#           password: "asdfasdf",
#           password_confirmation: "asdasdfasdf"
#         })

#         json = jsonify(response)

#         expect(response).to have_http_status(:unprocessable_entity)
#         expect(json["error"]).to eq("Password confirmation doesn't match Password")
#         expect(User.count).to eq(0)
#       end

#       it "fails if first name is blank" do
#         post_sign_up(params: { first_name: "" })

#         json = jsonify(response)

#         expect(response).to have_http_status(:unprocessable_entity)
#         expect(json["error"]).to eq("First name can't be blank")
#       end

#       it "fails if last name is blank" do
#         post_sign_up(params: { last_name: "" })

#         json = jsonify(response)

#         expect(response).to have_http_status(:unprocessable_entity)
#         expect(json["error"]).to eq("Last name can't be blank")
#       end
#     end
#   end

#   describe '#update' do
#     before(:each) do
#       User.destroy_all
#       Sidekiq::Worker.clear_all

#       @old_email = "old.email@address.com"
#       @password = "password"

#       @user = FactoryBot.create :user,
#         email: @old_email,
#         password: @password,
#         password_confirmation: @password

#       @headers = Devise::JWT::TestHelpers.auth_headers({}, @user)
#     end

#     def put_update_user(user_params: {}, headers: {})
#       default_params = {}

#       put '/api/v1/users',
#         params: {
#           user: default_params.merge(user_params)
#         },
#         headers: headers
#     end

#     it 'returns an updated JWT payload' do
#       put_update_user(
#         user_params: {
#           first_name: 'Firstnamer',
#           current_password: @password
#         },
#         headers: @headers
#       )

#       expect(@user.reload.first_name).to eq 'Firstnamer'

#       token = decode_header(response)
#       expect(token['first_name']).to eq 'Firstnamer'
#     end

#     it 'sends a confirmation email if email changed' do
#       new_email = 'a.new@email.address'

#       put_update_user(
#         user_params: {
#           email: new_email,
#           current_password: @password
#         },
#         headers: @headers
#       )

#       json = jsonify(response)

#       @user.reload

#       user = User.first

#       expect(@user.unconfirmed_email).to eq new_email
#       expect(@user.email).to eq @old_email
#       expect(find_jobs("confirmation_instructions").size).to eq(1)
#     end

#     it 'sends no confirmation email if email wasnt changed' do
#       put_update_user(
#         user_params: {
#           email: @old_email,
#           current_password: @password
#         },
#         headers: @headers
#       )

#       json = jsonify(response)

#       expect(find_jobs("confirmation_instructions").size).to eq(0)
#     end

#     it "successfully updates the user" do
#       new_password = 'hithere5'

#       user_params = {
#         current_password: @password,
#         email: Faker::Internet.email,
#         first_name: Faker::Name.first_name,
#         last_name: Faker::Name.last_name,
#         password: new_password,
#         password_confirmation: new_password,
#         due_days: 10,
#       }

#       put_update_user(
#         user_params: user_params,
#         headers: @headers
#       )

#       json = jsonify(response)

#       u = User.first

#       expect(response).to have_http_status(:success)
#       expect(u.first_name).to eq(user_params[:first_name])
#       expect(u.last_name).to eq(user_params[:last_name])
#       expect(u.unconfirmed_email).to eq(user_params[:email])
#       expect(u.due_days).to eq(user_params[:due_days])
#       expect(u.email).to eq(@user.email)
#     end

#     it "fails if password is wrong" do
#       user_params = {
#         current_password: "some_incorrect_pw",
#       }

#       put_update_user(user_params: user_params, headers: @headers)

#       json = jsonify(response)

#       expect(response).to have_http_status(:unprocessable_entity)
#     end

#     it "fails if the jwt is fake" do
#       fake_jwt = "alkjdsflajsfd"
#       put_update_user(headers: { 'Authorization': "Bearer #{fake_jwt}" })

#       json = jsonify(response)

#       expect(response).to have_http_status(:unauthorized)
#     end

#     it "fails if update_attributes fails" do
#       allow(@user).to receive(:update_attributes).and_return(false)

#       allow_any_instance_of(Api::V1::RegistrationsController)
#         .to receive(:current_user)
#         .and_return(@user)

#       user_params = {
#         current_password: @password,
#       }

#       put_update_user(user_params: user_params, headers: @headers)

#       json = jsonify(response)

#       expect(json[:error]).to eq('Unable to update attributes.')
#     end

#     it "fails unless user is signed in" do
#       put_update_user

#       json = jsonify(response)

#       expect(response).to have_http_status(:unauthorized)
#     end
#   end
# end
