ActiveAdmin.register JobDescription do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  JOB_DESCRIPTION_BASE_PARAMS = [:company_id,
    :benefits_profile_id,
    :title,
    :role_name,
    :job_function,
    :description_markdown,
    :hiring_manager_name,
    :hiring_manager_title,
    :location
  ].freeze

  permit_params JOB_DESCRIPTION_BASE_PARAMS + [
    :marked_complete,
    :published,
    :hiring_manager_photo,
    :remove_hiring_manager_photo
  ]

  scope :completed
  scope :published

  filter :company
  filter :created_at
  filter :updated_at
  filter :title
  filter :marked_complete_at
  filter :published_at
  filter :role_name
  filter :job_function
  filter :description_markdown
  filter :hiring_manager_name
  filter :hiring_manager_title
  filter :location
  
  index do
    selectable_column
    id_column
    column :company
    column :title
    column :hiring_manager_name
    column :created_at
    column :updated_at
    actions
  end

  show do
    attributes_table do
      attributes = JOB_DESCRIPTION_BASE_PARAMS.dup
      attributes.insert(1, :marked_complete_at)
      attributes.insert(2, :published_at)
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
        elsif param.to_s.ends_with?("_markdown")
          instance_exec(param, &Admin::MarkdownHelper.render_markdown)
        else
          row param
        end
      end
      row :hiring_manager_photo do
        self.instance_exec(:hiring_manager_photo, resource, &Admin::ImageHelper.render_image)
      end
    end
    active_admin_comments
  end

  form html: { multipart: true } do |f|
    f.semantic_errors
    columns = f.form_builder.send :default_columns_for_object
    columns -= [:marked_complete_at, :published_at]
    f.inputs do
      columns.each_with_index do |column, index|
        # insert virtual columns
        if index == 3
          f.input :marked_complete, as: :boolean
          f.input :published, as: :boolean
        end

        col = object.class.column_for_attribute(column)
        if col.respond_to?(:array?) && col.array?
          f.input column, as: :array
        elsif column.to_s.end_with?("_at")
          f.input column, as: :datetime_picker
        elsif column.to_s.ends_with?("_markdown")
          f.input column, as: :markdown
        elsif column == :job_function
          f.input column, as: :select, collection: GlobalSettingsStore.instance.job_functions { |job_function| [job_function, job_function] }
        else
          f.input column
        end
      end
      f.input :hiring_manager_photo, as: :image_file
    end
    f.actions
  end
end
