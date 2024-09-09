class ImageFilesInput < Formtastic::Inputs::FileInput
  def to_html
    input_wrapping do
      label_html << image_input_wrapper do
        existing_images_html +
          builder.file_field(method, input_html_options.merge(default_file_field_html))
      end
    end
  end

  def image_input_wrapper(&block)
    template.content_tag(:div, flex_style_html, &block)
  end

  def existing_images_html
    template.content_tag(:div, flex_style_html("row")) do
      object.send(method).map do |image_attachment|
        div_id = existing_image_id(image_attachment.id)
        template.content_tag(:div, flex_style_html.merge(id: div_id)) do
          template.content_tag(:div) do
            image_tag(url_for(object.thumbnail(image_attachment)))
          end +
          image_deletion_button(image_attachment)
        end
      end.join.html_safe
    end
  end

  def image_deletion_button(image_attachment)
    hidden_field_id = image_deletion_hidden_field_id(image_attachment.id)
    link_to("Remove image", '#', { data: {
      enable: "##{hidden_field_id}",
      hide: "##{existing_image_id(image_attachment.id)}"
    }}) +
    builder.hidden_field("remove_#{method}",
      value: image_attachment.id,
      id: hidden_field_id,
      disabled: true,
      multiple: true
    )
  end

  def file_upload_id
    @file_upload_id ||= "upload-#{SecureRandom.hex}"
  end

  def existing_image_id(attachment_id)
    "image-#{attachment_id}"
  end

  def image_deletion_hidden_field_id(attachment_id)
    "delete-image-#{attachment_id}"
  end

  def flex_style_html(direction = "column")
    { style: "display:flex; flex-direction:#{direction};"}
  end

  def default_file_field_html
    { multiple: true }
  end

  def has_attachment?
    object.send(method).attached?
  end

  delegate :link_to, :image_tag, :url_for, to: :template
end