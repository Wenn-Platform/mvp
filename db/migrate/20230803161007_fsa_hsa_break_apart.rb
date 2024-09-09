class FsaHsaBreakApart < ActiveRecord::Migration[6.1]
  def change
    rename_column :benefits_profiles, :hsa_fsa, :health_savings_account
    add_column :benefits_profiles, :flexible_spending_account, :boolean
  end
end
