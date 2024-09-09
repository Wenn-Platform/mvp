class CompanyBlueprint < ApplicationBlueprint
  fields :created_at, :updated_at
  
  view :basic do
    fields :name,
      :description,
      :website_url,
      :size,
      :founded_at,
      :headquarters_location,
      :industry_tags

    field :logomark_thumbnail_url do |object|
      Rails.application.routes.url_helpers.url_for(
        object.thumbnail(:logomark)
      ) if object.logomark.attached?
    end
    
    association :default_benefits_profile, blueprint: BenefitsProfileBlueprint
  end

  view :full do
    include_view :basic

    fields :default_benefits_profile_id,
      :glassdoor_overall_score,
      :glassdoor_review_count,
      :glassdoor_url,
      :twitter_username,
      :facebook_username,
      :instagram_username,
      :tiktok_username,
      :youtube_username,
      :linkedin_username

    field :logomark_url do |object|
      Rails.application.routes.url_helpers.url_for(
        object.logomark
      ) if object.logomark.attached?
    end
    
    field :primary_cover_photo_url do |object|
      Rails.application.routes.url_helpers.url_for(
        object.primary_cover_photo
      ) if object.primary_cover_photo.attached?
    end

    field :secondary_cover_photo_url do |object|
      Rails.application.routes.url_helpers.url_for(
        object.secondary_cover_photo
      ) if object.secondary_cover_photo.attached?
    end
  end

  view :index do
    include_view :basic
    association :published_job_descriptions,
      blueprint: JobDescriptionBlueprint,
      view: :company_index
  end

  view :show do
    include_view :full
    association :published_job_descriptions,
      blueprint: JobDescriptionBlueprint,
      view: :company_show
  end

  view :job_description_index do
    include_view :basic
  end

  view :job_description_show do
    include_view :full
  end
end
