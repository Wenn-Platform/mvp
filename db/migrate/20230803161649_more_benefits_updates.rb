class MoreBenefitsUpdates < ActiveRecord::Migration[6.1]
  def change
    rename_column :benefits_profiles, :we_give_back, :volunteer_programs
    add_column :benefits_profiles, :disability_insurance, :boolean
  end
end
