class AddStartAndEndPagesToScenes < ActiveRecord::Migration[5.1]
  def change
    add_column :scenes, :end_page, :integer
    add_column :scenes, :start_page, :integer
  end
end
