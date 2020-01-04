class CreateJoinTableCharacterGroupStageDirection < ActiveRecord::Migration[6.0]
  def change
    create_join_table :character_groups, :stage_directions do |t|
      t.index [:character_group_id, :stage_direction_id], name: 'index_character_groups_stage_directions'
    end
  end
end
