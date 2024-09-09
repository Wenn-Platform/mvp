# == Schema Information
#
# Table name: benefits_profiles
#
#  id                              :uuid             not null, primary key
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  company_id                      :uuid             not null
#  name                            :string           default("Company default"), not null
#  work_from_home                  :boolean
#  flex_time_scheduling            :boolean
#  unlimited_pto                   :boolean
#  mentorship_program              :boolean
#  work_abroad                     :boolean
#  on_site_daycare                 :boolean
#  paternity_leave                 :boolean
#  extended_maternity_leave        :boolean
#  medical_dental_vision           :boolean
#  full_paid_medical_dental_vision :boolean
#  life_insurance                  :boolean
#  401k                            :boolean
#  401k_matching                   :boolean
#  tuition_education_reimbursement :boolean
#  commuter_benefits               :boolean
#  car_allowance                   :boolean
#  mental_health_days              :boolean
#  pet_friendly_office             :boolean
#  employee_owned                  :boolean
#  equity_program_stock_program    :boolean
#  fortune_1000                    :boolean
#  startup                         :boolean
#  non_profit                      :boolean
#  volunteer_programs              :boolean
#  environmental_advocates         :boolean
#  eco_friendly                    :boolean
#  social_advocates                :boolean
#  community_support_programs      :boolean
#  salute_to_service               :boolean
#  second_chance                   :boolean
#  local_business                  :boolean
#  minority_owned_business         :boolean
#  woman_owned_business            :boolean
#  lgbtq_owned_business            :boolean
#  idd_asd_special_needs_employer  :boolean
#  down_with_down_time             :boolean
#  intrapreneurial_entrepreneurial :boolean
#  employee_perks_discounts        :boolean
#  disability_owned_business       :boolean
#  family_owned                    :boolean
#  b_corp                          :boolean
#  onsite_gym                      :boolean
#  health_savings_account          :boolean
#  health_insurance                :boolean
#  mental_health_benefits          :boolean
#  adoption_assistance             :boolean
#  fertility_benefits              :boolean
#  paid_family_leave               :boolean
#  family_support_resources        :boolean
#  work_from_home_stipend          :boolean
#  four_day_work_week              :boolean
#  hybrid_work                     :boolean
#  casual_dress                    :boolean
#  happy_hours                     :boolean
#  meals_provided                  :boolean
#  company_outings                 :boolean
#  promote_from_within             :boolean
#  leadership_training             :boolean
#  work_visa_sponsorships          :boolean
#  internship_program              :boolean
#  education_assistance            :boolean
#  relocation_assistance           :boolean
#  stock_purchase_program          :boolean
#  performance_bonus               :boolean
#  flexible_spending_account       :boolean
#  disability_insurance            :boolean
#
class BenefitsProfile < ApplicationRecord
  BOOLEAN_COLUMNS = columns.find_all do |column|
    column.type == :boolean
  end.map(&:name).freeze
  
  belongs_to :company

  def self.human_attribute_name(attribute, default: nil)
    I18n.t("formtastic.labels.benefits_profile.#{attribute}", default: default || attribute.to_s.humanize)
  end
end
