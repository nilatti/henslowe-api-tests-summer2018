class MakeSpaceIdOptionalInRehearsals < ActiveRecord::Migration[6.0]
  def change
    change_column_null :rehearsals, :space_id, true
  end
end
