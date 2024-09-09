class TwitterScrapeWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def self.logger
    Rails.logger.tagged(self.class.name)
  end

  def perform(company_id)
    company = Company.find(company_id)

    if company.twitter_username.blank?
      self.class.logger.warn("Company #{company_id} does not have a twitter username; aborting")
      return
    end

    self.class.logger.debug("Scraping twitter for company #{company_id}")

    tweets = TwitterScraper.new(company.twitter_username).scrape

    failed = []
    succeeded = []
    already_in_db = []
    skipped_replies = []
    tweets.each do |tweet|
      # skip replies
      if tweet['InReplyToStatus'].present?
        skipped_replies.push(tweet)
        next
      end

      social_media_post = SocialMediaPost.create_with(
        company_id: company_id,
        posted_at: tweet['TimeParsed'],
        third_party_username: tweet['Username'].downcase,
        third_party_post_url: tweet['PermanentURL'],
        content: tweet['Text'],
        media_url: tweet['Photos'].try(:[], 0).try(:[], 'URL') ||
          tweet['Videos'].try(:[], 0).try(:[], 'URL'),
        raw_response: tweet
      ).find_or_create_by(
        third_party_post_id: tweet['ID'],
        third_party_provider: 'twitter',
      )

      if !social_media_post.persisted?
        self.class.logger.debug("Failed to create social media post: #{social_media_post.errors.full_messages}. Tweet ID: #{tweet['ID']}, scraping error: #{tweet['Error']}")
        failed.push(social_media_post)
      elsif social_media_post.id_previously_changed?
        succeeded.push(social_media_post)
      else
        already_in_db.push(social_media_post)
      end
    end

    store twitter_username: company.twitter_username,
      tweet_count: tweets.count,
      already_in_db_count: already_in_db.count,
      skipped_replies_count: skipped_replies.count,
      succeeded_count: succeeded.count,
      succeeded_ids: succeeded.map(&:id).join(', '),
      failed_count: failed.count,
      failed_messages: failed.map { |f| f.errors.full_messages }.join(', ')

    DataSync::Scheduler.new(company, :twitter).schedule_next
  end
end