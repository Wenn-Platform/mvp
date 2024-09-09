class Api::V1::JobDescriptionsController < Api::V1::BaseApiController
  skip_before_action :authenticate_user!, only: [:index, :show]

  def index
    render json: JobDescriptionBlueprint.render(
      scope.order(published_at: :desc).take(20),
      view: :index
    )
  end

  def show
    render json: JobDescriptionBlueprint.render(
      scope.find(params[:id]),
      view: :show
    )
  end

  def scope
    JobDescription.published.includes(
      :benefits_profile, company: [:default_benefits_profile]
    )
  end
end