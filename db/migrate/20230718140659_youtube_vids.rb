class YoutubeVids < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :youtube_video_url_1, :string
    add_column :companies, :youtube_video_url_2, :string
    add_column :companies, :youtube_video_url_3, :string
    add_column :companies, :youtube_video_url_4, :string
  end
end
