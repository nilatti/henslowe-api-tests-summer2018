class CreateJoinTableFrenchScenesRehearsal < ActiveRecord::Migration[6.0]
  def change
    create_join_table :french_scenes, :rehearsals do |t|
      # t.index [:french_scene_id, :rehearsal_id]
      # t.index [:rehearsal_id, :french_scene_id]
    end
  end
end
