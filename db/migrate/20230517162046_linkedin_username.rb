class LinkedinUsername < ActiveRecord::Migration[6.0]
  def change
    add_column :companies, :linkedin_username, :string
  end
end