class AddUniqueIndexToOnstages < ActiveRecord::Migration[6.1]
  def change
    add_index :on_stages, [:french_scene_id, :character_id], unique: true
    add_index :on_stages, [:french_scene_id, :character_group_id], unique: true
  end
end
