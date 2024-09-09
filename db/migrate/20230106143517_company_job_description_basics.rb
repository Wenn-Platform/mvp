class CompanyJobDescriptionBasics < ActiveRecord::Migration[6.0]
  def change
    create_table :companies, id: :uuid do |t|
      t.timestamps
      t.string :name, null: false
      t.text :description
      t.string :website_url
      t.string :size
      t.date :founded_at
      t.string :headquarters_location
      t.string :tags, array: true, default: []
      t.uuid :default_benefits_profile_id
      t.decimal :glassdoor_overall_score
      t.integer :glassdoor_review_count
      t.string :glassdoor_url
      t.string :twitter_username
      t.text :twitter_post_1_content
      t.datetime :twitter_post_1_posted_at
      t.text :twitter_post_2_content
      t.datetime :twitter_post_2_posted_at
      t.text :twitter_post_3_content
      t.datetime :twitter_post_3_posted_at
      t.string :facebook_username
      t.text :facebook_post_1_content
      t.datetime :facebook_post_1_posted_at
      t.text :facebook_post_2_content
      t.datetime :facebook_post_2_posted_at
      t.text :facebook_post_3_content
      t.datetime :facebook_post_3_posted_at
      t.string :instagram_username
      t.string :tiktok_username
    end

    create_table :job_descriptions, id: :uuid do |t|
      t.timestamps
      t.uuid :company_id, index: true, null: false
      t.uuid :benefits_profile_id, index: true
      t.string :title, null: false
      t.string :role_name
      t.text :description
      t.string :hiring_manager_name
      t.string :hiring_manager_title
      t.string :location
    end

    create_table :benefits_profiles, id: :uuid do |t|
      t.timestamps
      t.uuid :company_id, index: true, null: false
      t.string :name, null: false, default: "Company default"
      t.boolean :work_from_home
      t.boolean :flex_time_scheduling
      t.boolean :unlimited_pto
      t.boolean :mentorship_program
      t.boolean :employee_assistance_programs
      t.boolean :employee_wellness_programs
      t.boolean :work_abroad
      t.boolean :on_site_daycare
      t.boolean :paternity_leave
      t.boolean :extended_maternity_leave
      t.boolean :learning_organization
      t.boolean :employee_development
      t.boolean :medical_dental_vision
      t.boolean :full_paid_medical_dental_vision
      t.boolean :life_insurance
      t.boolean :'401k'
      t.boolean :'401k_matching'
      t.boolean :tuition_education_reimbursement
      t.boolean :commuter_benefits
      t.boolean :car_allowance
      t.boolean :mental_health_days
      t.boolean :pet_friendly_office
      t.boolean :employee_owned
      t.boolean :equity_program_stock_program
      t.boolean :fortune_1000
      t.boolean :startup
      t.boolean :non_profit
      t.boolean :we_give_back
      t.boolean :environmental_advocates
      t.boolean :eco_friendly
      t.boolean :social_advocates
      t.boolean :community_support_programs
      t.boolean :salute_to_service
      t.boolean :second_chance
      t.boolean :local_business
      t.boolean :minority_owned_business
      t.boolean :woman_owned_business
      t.boolean :lgbtq_owned_business
      t.boolean :idd_asd_special_needs_employer
      t.boolean :down_with_down_time
      t.boolean :intrapreneurial_entrepreneurial
      t.boolean :employee_perks_discounts
      t.boolean :disability_owned_business
      t.boolean :family_owned
      t.boolean :b_corp
    end
  end
end
