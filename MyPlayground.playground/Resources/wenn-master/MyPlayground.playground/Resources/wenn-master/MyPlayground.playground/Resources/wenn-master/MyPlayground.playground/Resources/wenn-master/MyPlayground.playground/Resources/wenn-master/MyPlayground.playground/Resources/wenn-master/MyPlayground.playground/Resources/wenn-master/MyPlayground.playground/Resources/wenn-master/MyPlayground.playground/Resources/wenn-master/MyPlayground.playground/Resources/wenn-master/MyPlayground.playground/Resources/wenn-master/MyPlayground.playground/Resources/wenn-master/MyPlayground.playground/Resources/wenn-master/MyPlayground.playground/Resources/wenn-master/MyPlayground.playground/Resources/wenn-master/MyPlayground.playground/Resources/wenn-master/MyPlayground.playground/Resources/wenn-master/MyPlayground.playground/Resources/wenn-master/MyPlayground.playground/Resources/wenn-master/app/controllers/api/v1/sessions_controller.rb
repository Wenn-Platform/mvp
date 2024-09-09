class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json

  def respond_with(resource, _opts = {})
    if resource.errors.any?
      render json: { errors: resource.errors }
    else
      render json: UserBlueprint.render(resource, view: :current_user)
    end
  end
end
