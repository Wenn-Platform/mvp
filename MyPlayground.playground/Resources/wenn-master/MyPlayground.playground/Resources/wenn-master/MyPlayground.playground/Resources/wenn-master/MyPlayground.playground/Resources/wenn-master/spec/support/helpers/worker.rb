module Helpers
  module Worker
    def find_jobs(search_string)
      Sidekiq::Worker.jobs.to_s.scan(/#{search_string}/)
    end

    def job_in_queue?(search_string)
      Sidekiq::Worker.jobs.to_s.scan(/#{search_string}/).size > 0
    end

    def print_jobs
      Sidekiq::Worker.jobs.each do |j|
        ap j
      end
    end
  end
end
