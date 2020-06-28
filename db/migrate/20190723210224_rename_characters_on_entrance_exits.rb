class RenameCharactersOnEntranceExits < ActiveRecord::Migration[5.2]
  def change
    rename_column :entrance_exits, :characters_id, :character_id
  end
end
