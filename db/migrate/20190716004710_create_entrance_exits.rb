class CreateEntranceExits < ActiveRecord::Migration[5.2]
  def change
    create_table :entrance_exits do |t|
      t.belongs_to :french_scene, foreign_key: true
      t.integer :page
      t.integer :line
      t.integer :order
      t.belongs_to :user, foreign_key: true
      t.belongs_to :stage_exit, foreign_key: true

      t.timestamps
    end
  end
end
