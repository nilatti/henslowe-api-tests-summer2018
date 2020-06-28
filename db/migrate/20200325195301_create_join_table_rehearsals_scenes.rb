class CreateJoinTableRehearsalsScenes < ActiveRecord::Migration[6.0]
  def change
    create_join_table :scenes, :rehearsals do |t|
      # t.index [:scene_id, :rehearsal_id]
      # t.index [:rehearsal_id, :scene_id]
    end
  end
end
