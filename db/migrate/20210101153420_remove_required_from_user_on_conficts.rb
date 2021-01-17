class RemoveRequiredFromUserOnConficts < ActiveRecord::Migration[6.1]
  def change
    change_column_null :conflicts, :user_id, true
  end
end
