class AddJobFunctionToJob < ActiveRecord::Migration[6.1]
  def change
    add_column :job_descriptions, :job_function, :string
  end
end
