class CreateJoinTableCharacterEntranceExit < ActiveRecord::Migration[5.2]
  def change
    create_join_table :characters, :entrance_exits do |t|
      # t.index [:character_id, :entrance_exit_id]
      # t.index [:entrance_exit_id, :character_id]
    end
  end
end
