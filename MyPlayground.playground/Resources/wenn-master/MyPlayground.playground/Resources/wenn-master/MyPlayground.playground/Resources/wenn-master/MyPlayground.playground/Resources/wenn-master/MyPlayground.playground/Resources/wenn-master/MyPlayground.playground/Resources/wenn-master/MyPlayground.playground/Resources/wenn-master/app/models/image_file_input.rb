class ImageFileInput < Formtastic::Inputs::FileInput
  def to_html
    input_wrapping do
      label_html << image_input_wrapper do
        existing_image_html +
          builder.file_field(method, input_html_options.merge(default_file_field_html))
      end
    end
  end

  def image_input_wrapper(&block)
    template.content_tag(:div, flex_style_html, &block)
  end

  def existing_image_html
    template.content_tag(:div, flex_style_html.merge(id: existing_image_id)) do
      if has_attachment?
        template.content_tag(:div) do
          image_tag(url_for(object.thumbnail(method)))
        end +
        image_deletion_button
      end
    end
  end

  def image_deletion_button
    link_to("Remove image", '#', { data: {
      enable: "##{image_deletion_hidden_field_id}",
      hide: "##{existing_image_id}",
      show: "##{file_upload_id}"
    }}) +
    builder.hidden_field("remove_#{method}", value: true, id: image_deletion_hidden_field_id, disabled: true)
  end

  def file_upload_id
    "upload-#{id}"
  end

  def existing_image_id
    "image-#{id}"
  end

  def image_deletion_hidden_field_id
    "delete-image-#{id}"
  end

  def id
    @id ||= SecureRandom.hex
  end

  def flex_style_html
    { style: "display:flex; flex-direction:column;"}
  end

  def default_file_field_html
    if has_attachment?
      { style: "display:none;" }
    else
      {}
    end.merge(
      id: file_upload_id,
      data: { if_blank_enable: "##{image_deletion_hidden_field_id}" },
    )
  end

  def has_attachment?
    object.send(method).attached?
  end

  delegate :link_to, :image_tag, :url_for, to: :template
end