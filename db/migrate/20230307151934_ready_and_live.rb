class ReadyAndLive < ActiveRecord::Migration[6.0]
  def change
    add_column :companies, :marked_complete_at, :datetime
    add_column :companies, :published_at, :datetime

    add_column :job_descriptions, :marked_complete_at, :datetime
    add_column :job_descriptions, :published_at, :datetime
  end
end
