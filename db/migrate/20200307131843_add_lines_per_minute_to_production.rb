class AddLinesPerMinuteToProduction < ActiveRecord::Migration[6.0]
  def change
    add_column :productions, :lines_per_minute, :integer
  end
end
