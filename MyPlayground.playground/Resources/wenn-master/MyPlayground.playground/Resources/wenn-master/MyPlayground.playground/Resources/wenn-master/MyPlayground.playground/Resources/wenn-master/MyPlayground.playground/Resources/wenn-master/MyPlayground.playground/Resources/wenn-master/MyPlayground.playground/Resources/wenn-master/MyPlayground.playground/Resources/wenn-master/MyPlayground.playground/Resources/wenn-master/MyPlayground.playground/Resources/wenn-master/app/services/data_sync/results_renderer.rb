class DataSync::ResultsRenderer
  def initialize(results)
    @results = results
  end

  def render(view_context)
    return @results if TEMPLATES[@results['worker']].blank?

    view_context.render(
      TEMPLATES[@results['worker']], @results.symbolize_keys
    )
  end

  TEMPLATES = {
    TwitterScrapeWorker.name => 'data_sync/twitter_scrape_results',
  }
end