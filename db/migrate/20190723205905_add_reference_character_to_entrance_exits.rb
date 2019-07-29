class AddReferenceCharacterToEntranceExits < ActiveRecord::Migration[5.2]
  def change
    remove_column :entrance_exits, :character_id
    add_reference :entrance_exits, :characters
  end
end
