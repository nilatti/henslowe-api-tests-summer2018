class AddLineCountsToActsScenesFs < ActiveRecord::Migration[6.0]
  def change
    add_column :acts, :original_line_count, :integer
    add_column :acts, :new_line_count, :integer
    add_column :scenes, :original_line_count, :integer
    add_column :scenes, :new_line_count, :integer 
    add_column :french_scenes, :original_line_count, :integer
    add_column :french_scenes, :new_line_count, :integer
  end
end
