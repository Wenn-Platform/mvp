class Api::V1::CompaniesController < Api::V1::BaseApiController
  skip_before_action :authenticate_user!, only: [:index, :show]

  def index
    render json: CompanyBlueprint.render(
      scope.order(published_at: :desc).take(20),
      view: :index
    )
  end

  def show
    render json: CompanyBlueprint.render(
      scope.find(params[:id]),
      view: :show
    )
  end

  def scope
    Company.published.includes(
      :default_benefits_profile, :published_job_descriptions
    )
  end
end