class CreateJoinTableCharacterStageDirection < ActiveRecord::Migration[6.0]
  def change
    create_join_table :characters, :stage_directions do |t|
      t.index [:character_id, :stage_direction_id], name: 'index_characters_stage_directions'
    end
  end
end
