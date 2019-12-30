class CreateLabels < ActiveRecord::Migration[6.0]
  def change
    create_table :labels do |t|
      t.string :xml_id
      t.string :line_number
      t.string :content
      t.belongs_to :french_scene, null: false, foreign_key: true

      t.timestamps
    end
  end
end
