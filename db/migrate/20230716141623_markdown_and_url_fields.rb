class MarkdownAndUrlFields < ActiveRecord::Migration[6.1]
  def change
    rename_column :companies, :description, :description_markdown
    rename_column :job_descriptions, :description, :description_markdown
    add_column :companies, :what_makes_us_special_markdown, :text
    add_column :companies, :career_site_url, :string
  end
end
