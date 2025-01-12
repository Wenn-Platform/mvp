class CreateActiveAdminComments < ActiveRecord::Migration[6.0]
  def self.up
    create_table :active_admin_comments, id: :uuid do |t|
      t.timestamps
      t.string :namespace
      t.text   :body
      t.references :resource, polymorphic: true, type: :uuid
      t.references :author, polymorphic: true, type: :uuid
    end
    add_index :active_admin_comments, [:namespace]
  end

  def self.down
    drop_table :active_admin_comments
  end
end
