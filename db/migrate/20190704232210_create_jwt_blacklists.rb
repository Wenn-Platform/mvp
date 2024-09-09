class CreateJwtBlacklists < ActiveRecord::Migration[6.0]
  def change
    create_table :jwt_blacklists, id: :uuid do |t|
      t.string :jti, null: false, index: true
      t.datetime :exp, null: false, index: true
      t.timestamps
    end
  end
end
