class CreateStageExits < ActiveRecord::Migration[5.2]
  def change
    create_table :stage_exits do |t|
      t.belongs_to :production, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
