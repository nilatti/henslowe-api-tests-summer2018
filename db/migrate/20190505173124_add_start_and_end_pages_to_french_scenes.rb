class AddStartAndEndPagesToFrenchScenes < ActiveRecord::Migration[5.1]
  def change
    add_column :french_scenes, :end_page, :integer
    add_column :french_scenes, :start_page, :integer
  end
end
