class CreateGlobalSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :global_settings, id: :uuid do |t|
      t.timestamps
      t.string :name
      t.string :value, null: false
      t.index :name, unique: true
    end

    GlobalSetting.seed_all
  end
end
