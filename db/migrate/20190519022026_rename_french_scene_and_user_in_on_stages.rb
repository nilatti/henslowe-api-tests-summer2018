class RenameFrenchSceneAndUserInOnStages < ActiveRecord::Migration[5.1]
  def change
    rename_column :on_stages, :french_scene, :french_scene_id
    rename_column :on_stages, :user, :user_id
  end
end
