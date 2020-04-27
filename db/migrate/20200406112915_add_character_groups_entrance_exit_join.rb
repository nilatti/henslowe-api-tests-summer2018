class AddCharacterGroupsEntranceExitJoin < ActiveRecord::Migration[6.0]
  def change
    create_join_table :character_groups, :entrance_exits do |t|
      t.index [:character_group_id, :entrance_exit_id], name: 'index_character_groups_entrance_exits'
    end
  end
end
