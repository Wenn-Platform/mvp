module PublishingWorkflow
  extend ActiveSupport::Concern

  def marked_complete
    self.marked_complete_at.present?
  end

  def marked_complete=(value)
    self.marked_complete_at = ActiveModel::Type::Boolean.new.cast(value) ?
      self.marked_complete_at || DateTime.now :
      nil
  end

  alias_method :marked_complete?, :marked_complete

  def published
    self.published_at.present?
  end

  def published=(value)
    self.published_at = ActiveModel::Type::Boolean.new.cast(value) ?
      self.published_at || DateTime.now :
      nil
  end

  alias_method :published?, :published
  
  included do
    scope :completed, -> { where.not(marked_complete_at: nil) }
    scope :published, -> { where.not(published_at: nil) }


    validate do
      if !marked_complete? && published? 
        errors.add(:published, 'must be marked complete in order to be published')
      end
    end
  end
end