class SocialPosts < ActiveRecord::Migration[6.0]
  def change
    create_table :social_media_posts, id: :uuid do |t|
      t.timestamps
      t.uuid :company_id, null: false
      t.datetime :posted_at, null: false
      t.string :third_party_provider, null: false
      t.string :third_party_username, null: false
      t.string :third_party_post_id
      t.string :third_party_post_url
      t.string :title
      t.text :content
      t.string :media_url
    end
  end
end
