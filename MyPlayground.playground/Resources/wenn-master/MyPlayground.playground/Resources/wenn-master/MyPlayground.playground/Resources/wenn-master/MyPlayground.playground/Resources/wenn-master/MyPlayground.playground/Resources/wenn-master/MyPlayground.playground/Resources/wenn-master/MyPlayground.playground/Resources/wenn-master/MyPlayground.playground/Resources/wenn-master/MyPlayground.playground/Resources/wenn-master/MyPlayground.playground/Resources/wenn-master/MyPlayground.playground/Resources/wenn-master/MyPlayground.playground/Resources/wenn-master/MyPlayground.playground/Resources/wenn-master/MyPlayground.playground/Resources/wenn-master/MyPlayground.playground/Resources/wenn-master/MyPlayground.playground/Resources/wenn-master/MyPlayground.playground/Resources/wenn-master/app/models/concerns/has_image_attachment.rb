module HasImageAttachment
  extend ActiveSupport::Concern
  THUMBNAIL_SIZE = [100, 100]

  def thumbnail(attribute_or_attachment)
    attachment = attribute_or_attachment.respond_to?(:variable?) ? 
      attribute_or_attachment :
      self.send(attribute_or_attachment)
    attachment.variable? ?
      attachment.variant(resize_to_limit: THUMBNAIL_SIZE) :
      attachment
  end

  module ClassMethods
    def can_detach_one(has_one_attribute)
      remove_attr_name = :"remove_#{has_one_attribute}"
      attr_reader remove_attr_name
      define_method("#{remove_attr_name}=") do |value|
        Rails.logger.info("Attempting to remove #{has_one_attribute} with value #{value}")
        if ActiveModel::Type::Boolean.new.cast(value)
          self.send(has_one_attribute).purge
        end
      end
    end

    def can_detach_many(has_many_attribute)
      remove_attr_name = :"remove_#{has_many_attribute}"
      attr_reader remove_attr_name
      define_method("#{remove_attr_name}=") do |ids|
        Rails.logger.info("Attempting to remove #{has_many_attribute} with ids #{ids}")
        attachments = self.send(has_many_attribute).select do |attachment|
          ids.include?(attachment.id)
        end
        attachments.each(&:purge)
      end
    end
  end
end