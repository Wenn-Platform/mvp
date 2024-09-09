import React, { useState, useEffect } from 'react';
import jobDescriptionsResource from '../../resources/job_descriptions';

const JobDecriptionPage = ({ history, match, location }) => {
  const [loading, setLoading] = useState(true);
  const [jobDescription, setJobDescriptions] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await jobDescriptionsResource.show({ params: { id: match.params.id }});
        setJobDescriptions(response.data);
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [])

  return (<>
    {loading && <div>Loading...</div>}
    {!loading && <>
      <h1>Job: {jobDescription.title}</h1>
      <h3>{jobDescription.role_name} at {jobDescription.company.name}</h3>
      <p>{jobDescription.description}</p>
      <b>Additional details</b>
      <p>
        Hiring Manager:<br/>
        <img src={jobDescription.hiring_manager_photo_thumbnail_url} />
        {jobDescription.hiring_manager_name}, {jobDescription.hiring_manager_title}
        <br /><br />
        Location: {jobDescription.location}
      </p>
      <b>About {jobDescription.company.name}</b>
      <p>
        <img src={jobDescription.company.logomark_thumbnail_url} /><br />
        Founded: {jobDescription.company.founded_at}<br />
        HQ Location: {jobDescription.company.headquarters_location}<br />
        Size: {jobDescription.company.size}<br />
        Industries: {jobDescription.company.industry_tags.join(', ')}<br />
        {jobDescription.company.website_url && <>Website: <a href={jobDescription.company.website_url}>{jobDescription.company.website_url}</a></>}<br />
        {jobDescription.company.description}
      </p>
      <b>Socials</b>
      <p>
        Twitter: <a href={`https://www.twitter.com/${jobDescription.company.twitter_username}`} target="_blank">
          {jobDescription.company.twitter_username}
        </a>
        <br />Posts: <ul>
          <li>{jobDescription.company.twitter_post_1_content}<br/>Posted {jobDescription.company.twitter_post_1_posted_at}</li>
          <li>{jobDescription.company.twitter_post_2_content}<br/>Posted {jobDescription.company.twitter_post_2_posted_at}</li>
          <li>{jobDescription.company.twitter_post_3_content}<br/>Posted {jobDescription.company.twitter_post_3_posted_at}</li>
        </ul>
        Facebook: <a href={`https://www.facebook.com/${jobDescription.company.facebook_username}`} target="_blank">
          {jobDescription.company.facebook_username}
        </a>
        <br />Posts: <ul>
          <li>{jobDescription.company.facebook_post_1_content}<br/>Posted {jobDescription.company.facebook_post_1_posted_at}</li>
          <li>{jobDescription.company.facebook_post_2_content}<br/>Posted {jobDescription.company.facebook_post_2_posted_at}</li>
          <li>{jobDescription.company.facebook_post_3_content}<br/>Posted {jobDescription.company.facebook_post_3_posted_at}</li>
        </ul>
        Instagram: <a href={`https://www.instagram.com/${jobDescription.company.instagram_username}`} target="_blank">
          {jobDescription.company.instagram_username}
        </a>
      </p>
      <b>Benefits</b>
      <dl>
        <dt>work_from_home:</dt> <dd>{jobDescription.benefits_profile['work_from_home'] ? "Yes" : "No"}</dd>
        <dt>flex_time_scheduling:</dt> <dd>{jobDescription.benefits_profile['flex_time_scheduling'] ? "Yes" : "No"}</dd>
        <dt>unlimited_pto:</dt> <dd>{jobDescription.benefits_profile['unlimited_pto'] ? "Yes" : "No"}</dd>
        <dt>mentorship_program:</dt> <dd>{jobDescription.benefits_profile['mentorship_program'] ? "Yes" : "No"}</dd>
        <dt>employee_assistance_programs:</dt> <dd>{jobDescription.benefits_profile['employee_assistance_programs'] ? "Yes" : "No"}</dd>
        <dt>employee_wellness_programs:</dt> <dd>{jobDescription.benefits_profile['employee_wellness_programs'] ? "Yes" : "No"}</dd>
        <dt>work_abroad:</dt> <dd>{jobDescription.benefits_profile['work_abroad'] ? "Yes" : "No"}</dd>
        <dt>on_site_daycare:</dt> <dd>{jobDescription.benefits_profile['on_site_daycare'] ? "Yes" : "No"}</dd>
        <dt>paternity_leave:</dt> <dd>{jobDescription.benefits_profile['paternity_leave'] ? "Yes" : "No"}</dd>
        <dt>extended_maternity_leave:</dt> <dd>{jobDescription.benefits_profile['extended_maternity_leave'] ? "Yes" : "No"}</dd>
        <dt>learning_organization:</dt> <dd>{jobDescription.benefits_profile['learning_organization'] ? "Yes" : "No"}</dd>
        <dt>employee_development:</dt> <dd>{jobDescription.benefits_profile['employee_development'] ? "Yes" : "No"}</dd>
        <dt>medical_dental_vision:</dt> <dd>{jobDescription.benefits_profile['medical_dental_vision'] ? "Yes" : "No"}</dd>
        <dt>full_paid_medical_dental_vision:</dt> <dd>{jobDescription.benefits_profile['full_paid_medical_dental_vision'] ? "Yes" : "No"}</dd>
        <dt>life_insurance:</dt> <dd>{jobDescription.benefits_profile['life_insurance'] ? "Yes" : "No"}</dd>
        <dt>401k:</dt> <dd>{jobDescription.benefits_profile['401k'] ? "Yes" : "No"}</dd>
        <dt>401k_matching:</dt> <dd>{jobDescription.benefits_profile['401k_matching'] ? "Yes" : "No"}</dd>
        <dt>tuition_education_reimbursement:</dt> <dd>{jobDescription.benefits_profile['tuition_education_reimbursement'] ? "Yes" : "No"}</dd>
        <dt>commuter_benefits:</dt> <dd>{jobDescription.benefits_profile['commuter_benefits'] ? "Yes" : "No"}</dd>
        <dt>car_allowance:</dt> <dd>{jobDescription.benefits_profile['car_allowance'] ? "Yes" : "No"}</dd>
        <dt>mental_health_days:</dt> <dd>{jobDescription.benefits_profile['mental_health_days'] ? "Yes" : "No"}</dd>
        <dt>pet_friendly_office:</dt> <dd>{jobDescription.benefits_profile['pet_friendly_office'] ? "Yes" : "No"}</dd>
        <dt>employee_owned:</dt> <dd>{jobDescription.benefits_profile['employee_owned'] ? "Yes" : "No"}</dd>
        <dt>equity_program_stock_program:</dt> <dd>{jobDescription.benefits_profile['equity_program_stock_program'] ? "Yes" : "No"}</dd>
        <dt>fortune_1000:</dt> <dd>{jobDescription.benefits_profile['fortune_1000'] ? "Yes" : "No"}</dd>
        <dt>startup:</dt> <dd>{jobDescription.benefits_profile['startup'] ? "Yes" : "No"}</dd>
        <dt>non_profit:</dt> <dd>{jobDescription.benefits_profile['non_profit'] ? "Yes" : "No"}</dd>
        <dt>volunteer_programs:</dt> <dd>{jobDescription.benefits_profile['volunteer_programs'] ? "Yes" : "No"}</dd>
        <dt>environmental_advocates:</dt> <dd>{jobDescription.benefits_profile['environmental_advocates'] ? "Yes" : "No"}</dd>
        <dt>eco_friendly:</dt> <dd>{jobDescription.benefits_profile['eco_friendly'] ? "Yes" : "No"}</dd>
        <dt>social_advocates:</dt> <dd>{jobDescription.benefits_profile['social_advocates'] ? "Yes" : "No"}</dd>
        <dt>community_support_programs:</dt> <dd>{jobDescription.benefits_profile['community_support_programs'] ? "Yes" : "No"}</dd>
        <dt>salute_to_service:</dt> <dd>{jobDescription.benefits_profile['salute_to_service'] ? "Yes" : "No"}</dd>
        <dt>second_chance:</dt> <dd>{jobDescription.benefits_profile['second_chance'] ? "Yes" : "No"}</dd>
        <dt>local_business:</dt> <dd>{jobDescription.benefits_profile['local_business'] ? "Yes" : "No"}</dd>
        <dt>minority_owned_business:</dt> <dd>{jobDescription.benefits_profile['minority_owned_business'] ? "Yes" : "No"}</dd>
        <dt>woman_owned_business:</dt> <dd>{jobDescription.benefits_profile['woman_owned_business'] ? "Yes" : "No"}</dd>
        <dt>lgbtq_owned_business:</dt> <dd>{jobDescription.benefits_profile['lgbtq_owned_business'] ? "Yes" : "No"}</dd>
        <dt>idd_asd_special_needs_employer:</dt> <dd>{jobDescription.benefits_profile['idd_asd_special_needs_employer'] ? "Yes" : "No"}</dd>
        <dt>down_with_down_time:</dt> <dd>{jobDescription.benefits_profile['down_with_down_time'] ? "Yes" : "No"}</dd>
        <dt>intrapreneurial_entrepreneurial:</dt> <dd>{jobDescription.benefits_profile['intrapreneurial_entrepreneurial'] ? "Yes" : "No"}</dd>
        <dt>employee_perks_discounts:</dt> <dd>{jobDescription.benefits_profile['employee_perks_discounts'] ? "Yes" : "No"}</dd>
        <dt>disability_owned_business:</dt> <dd>{jobDescription.benefits_profile['disability_owned_business'] ? "Yes" : "No"}</dd>
        <dt>family_owned:</dt> <dd>{jobDescription.benefits_profile['family_owned'] ? "Yes" : "No"}</dd>
        <dt>b_corp:</dt> <dd>{jobDescription.benefits_profile['b_corp'] ? "Yes" : "No"}</dd>
      </dl>
    </>}
    
  </>)
}

export default JobDecriptionPage;

/*
"0e253fe3-1160-4c33-b05e-38b031c67bc8"
description
: 
"Awesome world-changing compression company"
facebook_post_1_content
: 
"Banh mi readymade locavore forage knausgaard green juice. Single-origin coffee readymade butcher. Butcher salvia paleo plaid flexitarian small batch occupy. Viral pabst iphone."
facebook_post_1_posted_at
: 
"2023-03-06 15:51:33 UTC"
facebook_post_2_content
: 
"Craft beer ugh phlogiston messenger bag. Direct trade gastropub gentrify. Hammock quinoa selvage. +1 phlogiston skateboard bushwick offal flannel art party. Actually paleo brunch 90's kinfolk listicle +1 cliche."
facebook_post_2_posted_at
: 
"2023-03-05 16:01:23 UTC"
facebook_post_3_content
: 
"Vinegar keytar cliche. Goth hoodie tote bag schlitz. Umami deep v 8-bit direct trade park. Cray kombucha asymmetrical."
facebook_post_3_posted_at
: 
"2023-03-03 02:37:06 UTC"
facebook_username
: 
"tatum_heidenreich"
founded_at
: 
"1977-09-14"
glassdoor_overall_score
: 
"0.8"
glassdoor_review_count
: 
2103
glassdoor_url
: 
"https://www.glassdoor.com/Reviews/Vista-Reviews-E21719.htm"
headquarters_location
: 
"Lake Lavonnestad, AR"
id
: 
"c7679f64-b330-436f-9fde-25c61ceaa6e2"
instagram_username
: 
primary_cover_photo_url
: 
"http://localhost:5200/api/v1/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWt3Wm1Fek56Y3paQzAzTlRReUxUUmhZamd0T0RreU9DMHhPRFJsTVRJME5UaGlNR0lHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--3b0737cec9a8d36d905547cf8dd9a52d838a347a/300"
secondary_cover_photo_url
: 
"http://localhost:5200/api/v1/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsyTURVNE5HVTBPQzFpWWpVM0xUUm1aVEl0WVRRMU55MHlZemRqTXpFek5ESmlZV1VHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--7a6139d78d81b7cf8693f954e84018451b54b481/300"
size
: 
"100-1000 employees"
tags
: 
["User-friendly", "leading", "edge", "methodology"]
tiktok_username
: 
"tatum_heidenreich"
twitter_post_1_content
: 
"Beware the barrenness of a busy life."
twitter_post_1_posted_at
: 
"2023-03-06 17:48:37 UTC"
twitter_post_2_content
: 
"Quality is not an act, it is a habit."
twitter_post_2_posted_at
: 
"2023-03-05 03:40:45 UTC"
twitter_post_3_content
: 
"Control thy passions lest they take vengence on thee."
twitter_post_3_posted_at
: 
"2023-03-02 17:46:03 UTC"
twitter_username
: 
"tatum_heidenreich"

: 
"c7679f64-b330-436f-9fde-25c61ceaa6e2"
created_at
: 
"2023-03-07 04:57:21 UTC"
description
: 
"Sed sint qui. Assumenda enim sit. Molestiae eum dolorem.\r\n\r\nExplicabo odit sed. Optio enim recusandae. Harum voluptatibus tenetur.\r\n\r\nMaxime quisquam molestiae. Dolores dignissimos et. Facere quisquam repellendus."

: 
"037177cf-d3d1-4aa6-91e6-3a0ed04381a5"
location
: 
*/
