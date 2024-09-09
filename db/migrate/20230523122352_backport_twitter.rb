class BackportTwitter < ActiveRecord::Migration[6.1]
  def change
    Company.find_each do |c|
      DataSync::AttributeInspector.new(c).reschedule(:twitter)
    end
  end
end
