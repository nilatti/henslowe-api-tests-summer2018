class CreateLines < ActiveRecord::Migration[6.0]
  def change
    create_table :lines do |t|
      t.string :ana
      t.belongs_to :character, null: false, foreign_key: true
      t.string :corresp
      t.belongs_to :french_scene, null: false, foreign_key: true
      t.string :next
      t.string :number
      t.string :prev
      t.string :type
      t.string :xml_id

      t.timestamps
    end
  end
end
