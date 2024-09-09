class GlobalSetting < ApplicationRecord
  SETTING_NAMES = %w(job_functions)

  SETTING_NAMES.each do |setting_name|
    define_singleton_method "#{setting_name}_key" do
      setting_name
    end
  end

  after_commit do
    GlobalSettingsStore.instance.cache_unset(self.name)
  end

  # add new setting defaults here and call .seed_all from db migrations
  # to ensure
  def self.seed_all
    GlobalSetting.find_or_create_by(name: :job_functions) do |setting|
      setting.value = 'Sales, Marketing, Engineering/IT, Design & UX, Finance, Human Resources, Legal, Operations, Product, Project Management'
    end
  end
end
