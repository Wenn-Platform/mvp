# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_08_15_154741) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "active_admin_comments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.uuid "resource_id"
    t.string "author_type"
    t.uuid "author_id"
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "active_storage_attachments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.uuid "record_id", null: false
    t.uuid "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admin_users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "benefits_profiles", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "company_id", null: false
    t.string "name", default: "Company default", null: false
    t.boolean "work_from_home"
    t.boolean "flex_time_scheduling"
    t.boolean "unlimited_pto"
    t.boolean "mentorship_program"
    t.boolean "work_abroad"
    t.boolean "on_site_daycare"
    t.boolean "paternity_leave"
    t.boolean "extended_maternity_leave"
    t.boolean "medical_dental_vision"
    t.boolean "full_paid_medical_dental_vision"
    t.boolean "life_insurance"
    t.boolean "401k"
    t.boolean "401k_matching"
    t.boolean "tuition_education_reimbursement"
    t.boolean "commuter_benefits"
    t.boolean "car_allowance"
    t.boolean "mental_health_days"
    t.boolean "pet_friendly_office"
    t.boolean "employee_owned"
    t.boolean "equity_program_stock_program"
    t.boolean "fortune_1000"
    t.boolean "startup"
    t.boolean "non_profit"
    t.boolean "volunteer_programs"
    t.boolean "environmental_advocates"
    t.boolean "eco_friendly"
    t.boolean "social_advocates"
    t.boolean "community_support_programs"
    t.boolean "salute_to_service"
    t.boolean "second_chance"
    t.boolean "local_business"
    t.boolean "minority_owned_business"
    t.boolean "woman_owned_business"
    t.boolean "lgbtq_owned_business"
    t.boolean "idd_asd_special_needs_employer"
    t.boolean "down_with_down_time"
    t.boolean "intrapreneurial_entrepreneurial"
    t.boolean "employee_perks_discounts"
    t.boolean "disability_owned_business"
    t.boolean "family_owned"
    t.boolean "b_corp"
    t.boolean "onsite_gym"
    t.boolean "health_savings_account"
    t.boolean "health_insurance"
    t.boolean "mental_health_benefits"
    t.boolean "adoption_assistance"
    t.boolean "fertility_benefits"
    t.boolean "paid_family_leave"
    t.boolean "family_support_resources"
    t.boolean "work_from_home_stipend"
    t.boolean "four_day_work_week"
    t.boolean "hybrid_work"
    t.boolean "casual_dress"
    t.boolean "happy_hours"
    t.boolean "meals_provided"
    t.boolean "company_outings"
    t.boolean "promote_from_within"
    t.boolean "leadership_training"
    t.boolean "work_visa_sponsorships"
    t.boolean "internship_program"
    t.boolean "education_assistance"
    t.boolean "relocation_assistance"
    t.boolean "stock_purchase_program"
    t.boolean "performance_bonus"
    t.boolean "flexible_spending_account"
    t.boolean "disability_insurance"
    t.index ["company_id"], name: "index_benefits_profiles_on_company_id"
  end

  create_table "companies", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name", null: false
    t.text "description_markdown"
    t.string "website_url"
    t.string "size"
    t.date "founded_at"
    t.string "headquarters_location"
    t.string "industry_tags", default: [], array: true
    t.uuid "default_benefits_profile_id"
    t.decimal "glassdoor_overall_score"
    t.integer "glassdoor_review_count"
    t.string "glassdoor_url"
    t.string "twitter_username"
    t.string "facebook_username"
    t.string "instagram_username"
    t.string "tiktok_username"
    t.datetime "marked_complete_at"
    t.datetime "published_at"
    t.string "youtube_username"
    t.string "linkedin_username"
    t.text "what_makes_us_special_markdown"
    t.string "career_site_url"
    t.string "youtube_video_url_1"
    t.string "youtube_video_url_2"
    t.string "youtube_video_url_3"
    t.string "youtube_video_url_4"
    t.string "youtube_cover_video_url"
  end

  create_table "content_gallery_items", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "sort_order", null: false
    t.string "resource_type", null: false
    t.uuid "resource_id", null: false
    t.string "video_url"
    t.string "title"
    t.text "description"
    t.index ["resource_type", "resource_id"], name: "index_content_gallery_items_on_resource"
  end

  create_table "global_settings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.string "value", null: false
    t.index ["name"], name: "index_global_settings_on_name", unique: true
  end

  create_table "job_descriptions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "company_id", null: false
    t.uuid "benefits_profile_id"
    t.string "title", null: false
    t.string "role_name"
    t.text "description_markdown"
    t.string "hiring_manager_name"
    t.string "hiring_manager_title"
    t.string "location"
    t.datetime "marked_complete_at"
    t.datetime "published_at"
    t.string "job_function"
    t.index ["benefits_profile_id"], name: "index_job_descriptions_on_benefits_profile_id"
    t.index ["company_id"], name: "index_job_descriptions_on_company_id"
  end

  create_table "jwt_blacklists", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["exp"], name: "index_jwt_blacklists_on_exp"
    t.index ["jti"], name: "index_jwt_blacklists_on_jti"
  end

  create_table "social_media_posts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "company_id", null: false
    t.datetime "posted_at", null: false
    t.string "third_party_provider", null: false
    t.string "third_party_username", null: false
    t.string "third_party_post_id"
    t.string "third_party_post_url"
    t.string "title"
    t.text "content"
    t.string "media_url"
    t.jsonb "raw_response"
    t.index ["third_party_post_id", "third_party_provider"], name: "index_social_media_posts_on_third_party_post_id", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
