class ChangeAllLineCountsFromIntToFloat < ActiveRecord::Migration[6.0]
  def change
    change_column :plays, :original_line_count, :float
    change_column :acts, :original_line_count, :float
    change_column :scenes, :original_line_count, :float
    change_column :french_scenes, :original_line_count, :float
    change_column :lines, :original_line_count, :float
    change_column :plays, :new_line_count, :float
    change_column :acts, :new_line_count, :float
    change_column :scenes, :new_line_count, :float
    change_column :french_scenes, :new_line_count, :float
    change_column :lines, :new_line_count, :float
  end
end
