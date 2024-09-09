class DataSync::AttributeInspector
  def initialize(company)
    @company = company
  end

  def update_schedules
    if @company.twitter_username_previously_changed?
      self.reschedule(:twitter)
    end
  end

  def reschedule(sync_type)
    data_sync_scheduler = DataSync::Scheduler.new(@company, sync_type)
    data_sync_scheduler.unschedule
    if @company.send("#{sync_type}_username").present?
      data_sync_scheduler.schedule_initial
    end
  end
end