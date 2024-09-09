# == Schema Information
#
# Table name: content_gallery_items
#
#  id            :uuid             not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  sort_order    :integer          not null
#  resource_type :string           not null
#  resource_id   :uuid             not null
#  video_url     :string
#  title         :string
#  description   :text
#
class ContentGalleryItem < ApplicationRecord
  include HasImageAttachment

  has_one_attached :photo, service: :local #:public_s3
  can_detach_one :photo
  validates :photo, blob: { content_type: :image }
  
  belongs_to :resource, polymorphic: true

  before_create do
    self.sort_order ||= (ContentGalleryItem.
      where(resource: self.resource).
      maximum(:sort_order) || 0) + 1
  end

  validate do
    unless self.photo.attached? ^ self.video_url.present?
      errors.add(:photo, 'please attach a photo OR specify a video url')
      errors.add(:video_url, 'please attach a photo OR specify a video url')
    end
  end
end
