class AllowNullSpaceIdOnConflicts < ActiveRecord::Migration[6.0]
  def change
    change_column_null :conflicts, :space_id, true
  end
end
