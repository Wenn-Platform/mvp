class JobDescriptionBlueprint < ApplicationBlueprint
  fields :created_at, :updated_at
  
  view :basic do
    fields :title,
      :role_name,
      :description,
      :hiring_manager_name,
      :hiring_manager_title,
      :location
  end

  view :full do
    include_view :basic
    
    association :benefits_profile, blueprint: BenefitsProfileBlueprint do |object|
      object.benefits_profile || object.company.default_benefits_profile
    end

    field :hiring_manager_photo_thumbnail_url do |object|
      Rails.application.routes.url_helpers.url_for(
        object.thumbnail(:hiring_manager_photo)
      ) if object.hiring_manager_photo.attached?
    end
  end

  view :index do
    include_view :basic

    association :company, blueprint: CompanyBlueprint, view: :job_description_index
  end

  view :show do
    include_view :full

    association :company, blueprint: CompanyBlueprint, view: :job_description_show
  end

  view :company_index do
    include_view :basic
  end

  view :company_show do
    include_view :full
  end
end
