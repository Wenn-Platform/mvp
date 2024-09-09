class YtUsername < ActiveRecord::Migration[6.0]
  def change
    add_column :companies, :youtube_username, :string
  end
end
