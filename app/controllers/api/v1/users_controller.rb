class Api::V1::UsersController < Api::V1::BaseApiController
  def show
    render json: UserBlueprint.render(current_user, view: :current_user)
  end
end
