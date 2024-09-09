# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

return if Rails.env.production?

if Rails.env.development?
  AdminUser.create(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
end

SPARSE_COMPANY_COUNT = 10
FULLY_POPULATED_COMPANY_COUNT = 10
JOB_DESCRIPTION_PER_COMPANY_COUNT = 3

require 'faker'
companies = []

print "Creating companies"

SPARSE_COMPANY_COUNT.times do
  company = Company.create!(
    name: Faker::Company.name
  )
  companies.push(company)
  print "."
end


random_glassdoor_job_urls = [
  "https://www.glassdoor.com/Reviews/Microsoft-Reviews-E1651.htm",
  "https://www.glassdoor.com/Reviews/Novus-Reviews-E388503.htm",
  "https://www.glassdoor.com/Reviews/Pegasystems-Reviews-E5936.htm",
  "https://www.glassdoor.com/Reviews/Vista-Reviews-E21719.htm",
]

FULLY_POPULATED_COMPANY_COUNT.times do
  print "."
  social_media_name = Faker::Twitter.screen_name
  company = Company.create!(
    name: Faker::Company.name,
    description: Faker::TvShows::SiliconValley.motto,
    founded_at: Faker::Date.birthday,
    headquarters_location: "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
    industry_tags: Faker::Company.catch_phrase.split(" "),
    size: ["Small", "100-1000 employees", "542"].sample,
    website_url: Faker::Internet.url,
    twitter_username: social_media_name,
    facebook_username: social_media_name,
    instagram_username: social_media_name,
    tiktok_username: social_media_name,
    glassdoor_overall_score: Faker::Number.decimal(l_digits: 1, r_digits: 1),
    glassdoor_review_count: Faker::Number.between(from: 1, to: 4000),
    glassdoor_url: random_glassdoor_job_urls.sample,
  )
  logo_url = Faker::Company.logo
  company.logomark.attach(
    io: URI.open(logo_url), filename: logo_url.split("/").last
  )
  cover_photo_url = Faker::LoremFlickr.image
  company.primary_cover_photo.attach(
    io: URI.open(cover_photo_url), filename: cover_photo_url.split("/").last
  )
  cover_photo_url = Faker::LoremFlickr.image
  company.secondary_cover_photo.attach(
    io: URI.open(cover_photo_url), filename: cover_photo_url.split("/").last
  )
  companies.push(company)
end

puts

print "Creating job descriptions and setting up benefits profiles"
companies.each do |company|
  print "."
  JOB_DESCRIPTION_PER_COMPANY_COUNT.times do
    job_description = company.job_descriptions.create(
      title: "#{Faker::Marketing.buzzwords.humanize}: #{Faker::Job.field}",
      role_name: Faker::Job.title,
      description: Faker::Lorem.paragraphs.join("\n\n"),
      hiring_manager_name: Faker::Name.name,
      hiring_manager_title: Faker::Job.title,
      location: "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
    )
    avatar_url = Faker::Avatar.image
    job_description.hiring_manager_photo.attach(
      io: URI.open(avatar_url), filename: avatar_url.split("/").last
    )
  end

  company.default_benefits_profile.update(
    BenefitsProfile::BOOLEAN_COLUMNS.each_with_object({}) do |column, attrs|
      attrs[column] = Faker::Boolean.boolean
    end
  )
end

GlobalSetting.seed_all
