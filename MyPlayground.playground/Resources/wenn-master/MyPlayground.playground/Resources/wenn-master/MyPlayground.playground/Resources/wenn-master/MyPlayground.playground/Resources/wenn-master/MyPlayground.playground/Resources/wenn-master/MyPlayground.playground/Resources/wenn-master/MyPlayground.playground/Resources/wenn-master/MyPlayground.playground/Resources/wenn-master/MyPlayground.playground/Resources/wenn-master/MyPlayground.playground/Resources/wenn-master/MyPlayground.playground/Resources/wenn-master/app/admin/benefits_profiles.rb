ActiveAdmin.register BenefitsProfile do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  BENEFITS_PROFILE_BASE_PARAMS = [
    :company_id,
    :name,
  ]

  permit_params BENEFITS_PROFILE_BASE_PARAMS + BenefitsProfile::BOOLEAN_COLUMNS
  
  index do
    selectable_column
    id_column
    column :company
    column :name
    column :created_at
    column :updated_at
    actions
  end

  show do
    attributes_table do
      attributes = BENEFITS_PROFILE_BASE_PARAMS.dup
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
    end
    I18n.t("benefits_profile.categories").map do |(category, attributes)|
      panel I18n.t("benefits_profile.category_labels.#{category}") do
        attributes_table_for resource do
          attributes.map do |attr|
            row attr
          end
        end
      end
    end
    active_admin_comments
  end

  form html: { multipart: true } do |f|
    f.semantic_errors
    columns = BENEFITS_PROFILE_BASE_PARAMS
    f.inputs do
      columns.each_with_index do |column, index|
        col = object.class.column_for_attribute(column)
        if col.respond_to?(:array?) && col.array?
          f.input column, as: :array
        elsif column.to_s.end_with?("_at")
          f.input column, as: :datetime_picker
        elsif column.to_s.ends_with?("_id") && resource.respond_to?(
          association_name = column.to_s.gsub(/_id$/, '')
        )
          f.input association_name
        else
          f.input column
        end
      end

      instance_exec(f, &Admin::BenefitsProfileHelper.render_benefits_form)
    end
    f.actions
  end
end
