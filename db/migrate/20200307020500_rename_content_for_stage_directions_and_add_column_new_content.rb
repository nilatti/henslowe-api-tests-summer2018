class RenameContentForStageDirectionsAndAddColumnNewContent < ActiveRecord::Migration[6.0]
  def change
    rename_column :stage_directions, :content, :original_content
    add_column :stage_directions, :new_content, :text
  end
end
