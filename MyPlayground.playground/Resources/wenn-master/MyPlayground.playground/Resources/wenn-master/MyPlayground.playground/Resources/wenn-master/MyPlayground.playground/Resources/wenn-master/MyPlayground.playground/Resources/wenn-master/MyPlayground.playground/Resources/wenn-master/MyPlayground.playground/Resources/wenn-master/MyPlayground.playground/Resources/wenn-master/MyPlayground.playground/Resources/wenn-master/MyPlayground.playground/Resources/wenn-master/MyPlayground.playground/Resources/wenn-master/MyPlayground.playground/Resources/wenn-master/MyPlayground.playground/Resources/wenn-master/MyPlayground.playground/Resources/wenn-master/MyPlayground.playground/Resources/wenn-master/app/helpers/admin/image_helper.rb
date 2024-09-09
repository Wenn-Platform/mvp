module Admin::ImageHelper
  def self.render_image
    Proc.new do |attribute, resource|
      attachment = resource.send(attribute)
      if attachment.attached?
        link_to url_for(attachment), target: :blank do
          image_tag url_for(resource.thumbnail(attribute))
        end
      end
    end
  end
end
