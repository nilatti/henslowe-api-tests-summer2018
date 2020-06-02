class AddLineCountsToLines < ActiveRecord::Migration[6.0]
  def change
    add_column :lines, :original_line_count, :integer
    add_column :lines, :new_line_count, :integer

  end
end
