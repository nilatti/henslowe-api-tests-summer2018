class AddUserToEntranceExit < ActiveRecord::Migration[6.1]
  def change
    add_reference :entrance_exits, :user, index: true
  end
end
