class YoutubeCoverField < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :youtube_cover_video_url, :string
  end
end
