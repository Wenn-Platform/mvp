class DropOldSocialColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :companies, :twitter_post_1_content
    remove_column :companies, :twitter_post_1_posted_at
    remove_column :companies, :twitter_post_2_content
    remove_column :companies, :twitter_post_2_posted_at
    remove_column :companies, :twitter_post_3_content
    remove_column :companies, :twitter_post_3_posted_at
    remove_column :companies, :facebook_post_1_content
    remove_column :companies, :facebook_post_1_posted_at
    remove_column :companies, :facebook_post_2_content
    remove_column :companies, :facebook_post_2_posted_at
    remove_column :companies, :facebook_post_3_content
    remove_column :companies, :facebook_post_3_posted_at
  end
end
