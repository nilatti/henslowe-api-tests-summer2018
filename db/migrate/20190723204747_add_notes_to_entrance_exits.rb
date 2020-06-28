class AddNotesToEntranceExits < ActiveRecord::Migration[5.2]
  def change
    add_column :entrance_exits, :notes, :text
  end
end
