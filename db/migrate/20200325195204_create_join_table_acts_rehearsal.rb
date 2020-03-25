class CreateJoinTableActsRehearsal < ActiveRecord::Migration[6.0]
  def change
    create_join_table :acts, :rehearsals do |t|
      # t.index [:act_id, :rehearsal_id]
      # t.index [:rehearsal_id, :act_id]
    end
  end
end
