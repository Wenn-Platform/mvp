# == Schema Information
#
# Table name: job_descriptions
#
#  id                   :uuid             not null, primary key
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  company_id           :uuid             not null
#  benefits_profile_id  :uuid
#  title                :string           not null
#  role_name            :string
#  description_markdown :text
#  hiring_manager_name  :string
#  hiring_manager_title :string
#  location             :string
#  marked_complete_at   :datetime
#  published_at         :datetime
#
class JobDescription < ApplicationRecord
  include HasImageAttachment
  include PublishingWorkflow
  
  belongs_to :company
  belongs_to :benefits_profile, required: false

  validates :title, presence: true, length: { minimum: 10 }

  has_one_attached :hiring_manager_photo, service: :public_s3
  can_detach_one :hiring_manager_photo
  validates :hiring_manager_photo, blob: { content_type: :image }

  has_many :content_gallery_items, as: :resource
  accepts_nested_attributes_for :content_gallery_items

  ACTIVE_ADMIN_ASSOCIATION_SCOPE_CONDITIONS = {
    benefits_profile: Proc.new { |job_description|
      { company: job_description.company }
    }
  }
end
