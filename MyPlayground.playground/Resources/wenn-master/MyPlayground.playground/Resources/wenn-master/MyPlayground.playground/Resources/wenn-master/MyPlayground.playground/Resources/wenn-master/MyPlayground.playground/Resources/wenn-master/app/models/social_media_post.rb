# == Schema Information
#
# Table name: social_media_posts
#
#  id                   :uuid             not null, primary key
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  company_id           :uuid             not null
#  posted_at            :datetime         not null
#  third_party_provider :string           not null
#  third_party_username :string           not null
#  third_party_post_id  :string
#  third_party_post_url :string
#  title                :string
#  content              :text
#  media_url            :string
#  raw_response         :jsonb
#
class SocialMediaPost < ApplicationRecord
  include HasImageAttachment
  
  belongs_to :company
  
  has_many_attached :images, service: :public_s3
  can_detach_many :images
  validates :images, blob: { content_type: :image }

  validates :posted_at, presence: true

  PROVIDERS = %w(twitter facebook instagram tiktok youtube linkedin).freeze

  validates :third_party_provider, presence: true, inclusion: {
    in: PROVIDERS,
    message: "%{value} is not a supported provider"
  }

  # admin dashboard does not yet support
  # has_many_attached :videos, service: :public_s3
  # can_detach_many :videos
  # validates :videos, blob: { content_type: :video }
end
