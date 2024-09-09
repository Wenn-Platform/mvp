class Gallery < ActiveRecord::Migration[6.1]
  def change
    create_table :content_gallery_items, id: :uuid do |t|
      t.timestamps
      t.integer :sort_order, null: false
      t.references :resource, polymorphic: true, type: :uuid, null: false
      t.string :video_url, null: true
      t.string :title, null: true
      t.text :description, null: true
    end
  end
end
