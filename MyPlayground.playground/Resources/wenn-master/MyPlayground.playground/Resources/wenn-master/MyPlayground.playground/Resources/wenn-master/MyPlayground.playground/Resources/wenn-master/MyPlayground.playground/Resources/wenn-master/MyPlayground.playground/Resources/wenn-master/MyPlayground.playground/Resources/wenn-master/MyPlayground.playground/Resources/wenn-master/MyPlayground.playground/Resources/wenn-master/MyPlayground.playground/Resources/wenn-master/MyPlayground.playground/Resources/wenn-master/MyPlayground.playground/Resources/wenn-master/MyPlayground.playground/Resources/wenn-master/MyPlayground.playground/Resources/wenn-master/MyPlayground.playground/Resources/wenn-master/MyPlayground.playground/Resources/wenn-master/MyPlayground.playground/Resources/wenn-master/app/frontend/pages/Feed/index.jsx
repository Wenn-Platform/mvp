import React, { useState, useEffect } from 'react';
import { JOB_DESCRIPTION } from '../../constants/routes';
import companiesResource from '../../resources/companies';

const FeedPage = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await companiesResource.index();
        setCompanies(response.data);
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [])
  return (<>
    <h1>My Feed</h1>
    {loading && <div>Loading...</div>}
    {!loading && companies.length && <ul>
      {companies.map((company) => {
        return <li key={company.id}>
          <strong>{company.name}</strong><br />
          <img src={company.logomark_thumbnail_url} /><br />
          {!!company.published_job_descriptions.length && <>
            {company.published_job_descriptions.length} job{company.published_job_descriptions.length !== 1 ? 's' : ''} available<br />
            <ol>
              {company.published_job_descriptions.map(jd => {
                return <li key={jd.id}>
                  <a href={JOB_DESCRIPTION(jd.id)}>
                    {jd.title}
                  </a>
                </li>
              })}
            </ol>
          </>} 
          
          Founded: {company.founded_at}<br />
          HQ Location: {company.headquarters_location}<br />
          Size: {company.size}<br />
          Industries: {company.industry_tags.join(', ')}<br />
          {company.website_url && <>Website: <a href={company.website_url}>{company.website_url}</a></>}<br />
          {company.description}<br /><br />
        </li>
      })}
    </ul>}
    {!loading && !companies.length && <div>
      We don't have anything for you now. Check back soon!
    </div>}
  </>)
}

export default FeedPage;
