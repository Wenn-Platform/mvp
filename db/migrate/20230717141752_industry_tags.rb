class IndustryTags < ActiveRecord::Migration[6.1]
  def change
    rename_column :companies, :tags, :industry_tags
  end
end
