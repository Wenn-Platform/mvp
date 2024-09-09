class SocialMediaPostRawJson < ActiveRecord::Migration[6.1]
  def change
    add_column :social_media_posts, :raw_response, :jsonb
    add_index :social_media_posts, [:third_party_post_id, :third_party_provider],
      unique: true, name: 'index_social_media_posts_on_third_party_post_id'
  end
end
