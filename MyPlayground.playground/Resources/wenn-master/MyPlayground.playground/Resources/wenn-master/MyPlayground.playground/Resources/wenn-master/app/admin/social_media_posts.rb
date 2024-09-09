ActiveAdmin.register SocialMediaPost do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #

SOCIAL_MEDIA_POST_BASE_PARAMS = [:company_id,
  :posted_at,
  :third_party_provider,
  :third_party_username,
  :third_party_post_id,
  :third_party_post_url,
  :title,
  :content,
  :media_url,
].freeze

permit_params SOCIAL_MEDIA_POST_BASE_PARAMS + [
  images: [],
  remove_images: [],
  # videos: [],
  # remove_videos: []
]

  filter :company
  filter :created_at
  filter :posted_at
  filter :third_party_provider
  filter :third_party_username
  filter :third_party_post_id
  filter :content
  
  index do
    selectable_column
    id_column
    column :company
    column :third_party_provider
    column :content
    column :created_at
    actions
  end

  show do
    attributes_table do
      attributes = SOCIAL_MEDIA_POST_BASE_PARAMS.dup
      attributes.unshift(:updated_at)
      attributes.unshift(:created_at)

      attributes.each do |param|
        if param.to_s.ends_with?("_url") && resource.send(param).present?
          row param do
            link_to resource.send(param), resource.send(param), target: :blank
          end
        elsif param.to_s.ends_with?("_id") && resource.respond_to?(
          association_name = param.to_s.gsub(/_id$/, '')
        )
          row association_name
        else
          row param
        end
      end
      row :images do
        resource.images.map do |image|
          link_to url_for(image), target: :blank do
            image_tag url_for(resource.thumbnail(image))
          end
        end
      end
      # row :videos do
      #   resource.videos.map do |video|
      #     link_to url_for(video), target: :blank do
      #       image_tag url_for(resource.thumbnail(video))
      #     end
      #   end
      # end
      row :raw_data do
        if resource.raw_response.present?
          pre JSON.pretty_generate(resource.raw_response)
        end
      end
    end
    active_admin_comments
  end

  form html: { multipart: true } do |f|
    f.semantic_errors
    columns = f.form_builder.send :default_columns_for_object
    f.inputs do
      columns.each_with_index do |column, index|

        col = object.class.column_for_attribute(column)
        if col.respond_to?(:array?) && col.array?
          f.input column, as: :array
        elsif column.to_s.end_with?("_at")
          f.input column, as: :datetime_picker
        elsif inclusion_validator = resource._validators[column].find { |v|
          v.is_a? ActiveModel::Validations::InclusionValidator
        }
          f.input column, as: :select, collection: inclusion_validator.options[:in]
        else
          f.input column
        end
      end
      f.input :images, as: :image_files
      f.input :videos, as: :file
    end
    f.actions
  end
end
