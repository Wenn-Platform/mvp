class DataSync::Scheduler
  SYNC_TYPES = {
    twitter: {
      period: 24.hours,
      worker: TwitterScrapeWorker,
    }
  }

  def initialize(company, sync_type)
    @company = company
    @sync_type = sync_type
  end

  def schedule_initial
    if !job
      self.job_id = worker.perform_async(@company.id)
    end
  end

  def schedule_next
    if self.job_id
      self.previous_job_id = self.job_id
    end
    self.job_id = worker.perform_at(period.from_now, @company.id)
  end

  def unschedule
    Sidekiq::Status.unschedule job_id
    Rails.cache.delete(key(:job_id))
  end

  def job_status
    Sidekiq::Status::status(job_id)
  end

  def previous_job_results
    Sidekiq::Status::get_all(previous_job_id)
  end

  def period
    SYNC_TYPES[@sync_type][:period]
  end

  def worker
    SYNC_TYPES[@sync_type][:worker]
  end

  def job
    ::Sidekiq::ScheduledSet.new.find_job(job_id) if job_id
  end

  def previous_job_id
    Rails.cache.read(key(:previous_job_id))
  end

  def previous_job_id=(job_id)
    Rails.cache.write(key(:previous_job_id), job_id)
  end

  def job_id=(job_id)
    Rails.cache.write(key(:job_id), job_id)
  end

  def job_id
    Rails.cache.read(key(:job_id))
  end

  def key(key_type)
    [self.class.name, @company.class.name, @company.id, @sync_type, key_type].join(':')
  end
end