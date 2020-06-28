class CreateJoinTableRehearsalsUsers < ActiveRecord::Migration[6.0]
  def change
    create_join_table :rehearsals, :users do |t|
      # t.index [:rehearsal_id, :user_id]
      # t.index [:user_id, :rehearsal_id]
    end
  end
end
