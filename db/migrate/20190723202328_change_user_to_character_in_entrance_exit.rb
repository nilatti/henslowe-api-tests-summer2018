class ChangeUserToCharacterInEntranceExit < ActiveRecord::Migration[5.2]
  def change
    rename_column :entrance_exits, :user_id, :character_id
  end
end
