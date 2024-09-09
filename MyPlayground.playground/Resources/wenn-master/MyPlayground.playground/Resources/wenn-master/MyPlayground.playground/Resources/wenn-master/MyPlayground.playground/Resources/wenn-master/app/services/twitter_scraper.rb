class TwitterScraper

  MAX_TWEETS = 10

  def self.logger
    Rails.logger.tagged(self.class.name)
  end

  def initialize(twitter_username)
    @twitter_username = twitter_username.gsub('@', '')
  end

  def scrape(max_tweets: MAX_TWEETS)
    if !@tweets_json
      stdout, @stderr, @status = Open3.capture3(
        Rails.root.join('scripts/twitter-scraper/twitter-scraper').to_s,
        @twitter_username,
        max_tweets.to_s
      )

      self.class.logger.warn("stderr: #{@stderr}") if @stderr.present?

      @tweets_json = JSON.parse(stdout)
    end

    @tweets_json
  end

  attr_reader :tweets_json, :status, :stderr
  delegate :success?, to: :status, allow_nil: true
end
