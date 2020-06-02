class AddLongLinesToStageDirections < ActiveRecord::Migration[6.0]
  def change

    change_column :stage_directions, :original_content, :mediumtext
    change_column :stage_directions, :new_content, :mediumtext
    change_column :lines, :new_content, :mediumtext
  end
end
