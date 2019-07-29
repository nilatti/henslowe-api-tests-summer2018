class RemoveForeignKeyConstraintOnEntranceExits < ActiveRecord::Migration[5.2]
  def change
    if foreign_key_exists?(:entrance_exits, :users)
      remove_foreign_key :entrance_exits, :users
    end
  end
end
