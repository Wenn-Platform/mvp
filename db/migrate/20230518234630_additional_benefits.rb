class AdditionalBenefits < ActiveRecord::Migration[6.1]
  def change
    add_column :benefits_profiles, :onsite_gym, :boolean
    add_column :benefits_profiles, :hsa_fsa, :boolean
    add_column :benefits_profiles, :health_insurance, :boolean
    add_column :benefits_profiles, :mental_health_benefits, :boolean
    add_column :benefits_profiles, :adoption_assistance, :boolean
    add_column :benefits_profiles, :fertility_benefits, :boolean
    add_column :benefits_profiles, :paid_family_leave, :boolean
    add_column :benefits_profiles, :family_support_resources, :boolean
    add_column :benefits_profiles, :work_from_home_stipend, :boolean
    add_column :benefits_profiles, :four_day_work_week, :boolean
    add_column :benefits_profiles, :hybrid_work, :boolean
    add_column :benefits_profiles, :casual_dress, :boolean
    add_column :benefits_profiles, :happy_hours, :boolean
    add_column :benefits_profiles, :meals_provided, :boolean
    add_column :benefits_profiles, :company_outings, :boolean
    add_column :benefits_profiles, :promote_from_within, :boolean
    add_column :benefits_profiles, :leadership_training, :boolean
    add_column :benefits_profiles, :work_visa_sponsorships, :boolean
    add_column :benefits_profiles, :internship_program, :boolean
    add_column :benefits_profiles, :education_assistance, :boolean
    add_column :benefits_profiles, :relocation_assistance, :boolean
    add_column :benefits_profiles, :stock_purchase_program, :boolean
    add_column :benefits_profiles, :performance_bonus, :boolean

    
    remove_column :benefits_profiles, :employee_assistance_programs, :boolean
    remove_column :benefits_profiles, :employee_wellness_programs, :boolean
    remove_column :benefits_profiles, :learning_organization, :boolean
    remove_column :benefits_profiles, :employee_development, :boolean
  end
end
