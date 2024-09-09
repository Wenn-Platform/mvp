# == Schema Information
#
# Table name: companies
#
#  id                             :uuid             not null, primary key
#  created_at                     :datetime         not null
#  updated_at                     :datetime         not null
#  name                           :string           not null
#  description_markdown           :text
#  website_url                    :string
#  size                           :string
#  founded_at                     :date
#  headquarters_location          :string
#  industry_tags                  :string           default([]), is an Array
#  default_benefits_profile_id    :uuid
#  glassdoor_overall_score        :decimal(, )
#  glassdoor_review_count         :integer
#  glassdoor_url                  :string
#  twitter_username               :string
#  facebook_username              :string
#  instagram_username             :string
#  tiktok_username                :string
#  marked_complete_at             :datetime
#  published_at                   :datetime
#  youtube_username               :string
#  linkedin_username              :string
#  what_makes_us_special_markdown :text
#  career_site_url                :string
#  youtube_video_url_1            :string
#  youtube_video_url_2            :string
#  youtube_video_url_3            :string
#  youtube_video_url_4            :string
#  youtube_cover_video_url        :string
#
class Company < ApplicationRecord
  include HasImageAttachment
  include PublishingWorkflow
  
  has_many :job_descriptions
  has_many :published_job_descriptions,
    -> { published },
    class_name: 'JobDescription'
  has_many :benefits_profiles
  belongs_to :default_benefits_profile,
    class_name: 'BenefitsProfile',
    required: false

  has_many :social_media_posts

  validates :name, presence: true, length: { minimum: 3 }

  has_one_attached :primary_cover_photo, service: :public_s3
  can_detach_one :primary_cover_photo
  validates :primary_cover_photo, blob: { content_type: :image }

  has_one_attached :secondary_cover_photo, service: :public_s3
  can_detach_one :secondary_cover_photo
  validates :secondary_cover_photo, blob: { content_type: :image }

  has_one_attached :logomark, service: :local #public_s3
  can_detach_one :logomark
  validates :logomark, blob: { content_type: :image }

  has_many :content_gallery_items, -> { order(:sort_order) }, as: :resource

  after_initialize do
    self.default_benefits_profile ||= BenefitsProfile.new
    self.default_benefits_profile.company = self
  end

  accepts_nested_attributes_for :default_benefits_profile
  accepts_nested_attributes_for :content_gallery_items, allow_destroy: true

  ACTIVE_ADMIN_ASSOCIATION_SCOPE_CONDITIONS = {
    default_benefits_profile: Proc.new { |company| { company: company } }
  }

  after_save do
    DataSync::AttributeInspector.new(self).update_schedules
  end

  def industry_tags=(value)
    if value.is_a?(String)
      marshaled = value.split(',').map do |val|
        val.strip.presence
      end.compact
      super(marshaled)
    else
      super
    end
  end
end
