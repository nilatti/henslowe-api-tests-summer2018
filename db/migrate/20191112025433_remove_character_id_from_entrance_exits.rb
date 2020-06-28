class RemoveCharacterIdFromEntranceExits < ActiveRecord::Migration[5.2]
  def change
    remove_column :entrance_exits, :character_id
  end
end
