class AddLineCountsToPlaysAndCharacters < ActiveRecord::Migration[6.0]
  def change
    add_column :plays, :original_line_count, :integer
    add_column :plays, :new_line_count, :integer
    add_column :characters, :original_line_count, :integer
    add_column :characters, :new_line_count, :integer
  end
end
