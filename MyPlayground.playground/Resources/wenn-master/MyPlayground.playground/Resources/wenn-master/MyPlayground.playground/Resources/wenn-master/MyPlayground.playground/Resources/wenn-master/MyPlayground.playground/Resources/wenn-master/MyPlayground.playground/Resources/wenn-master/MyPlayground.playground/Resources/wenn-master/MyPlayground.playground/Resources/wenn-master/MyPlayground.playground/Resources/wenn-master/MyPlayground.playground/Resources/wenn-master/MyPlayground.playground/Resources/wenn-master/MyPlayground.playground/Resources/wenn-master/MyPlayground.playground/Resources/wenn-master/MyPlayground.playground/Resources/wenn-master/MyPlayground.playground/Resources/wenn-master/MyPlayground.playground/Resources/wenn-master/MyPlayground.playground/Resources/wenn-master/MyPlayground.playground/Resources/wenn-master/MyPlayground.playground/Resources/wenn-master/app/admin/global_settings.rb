ActiveAdmin.register GlobalSetting do
  permit_params :value

  HINTS = {
    GlobalSetting.job_functions_key => "Comma separated list of job functions. This will be used in the filter dropdown in the app. Note that if you change or remove a function, you will 'orphan' any existing Job Descriptions that use that function. Please go update those Job Descriptions when done.",
  }
  
  form html: { multipart: true } do |f|
    panel "Warning" do
      "Use this form to change global settings that control how the application behaves. Changes made here will be live within #{(GlobalSettingsStore::CACHE_EXPIRATION_SECONDS / 60).ceil} minutes."
    end
    f.semantic_errors
    f.inputs do
      f.input :name, input_html: { disabled: true }
      f.input :value, hint: HINTS[f.object.name]
    end
    f.actions
  end
end
