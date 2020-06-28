class CreateSoundCues < ActiveRecord::Migration[6.0]
  def change
    create_table :sound_cues do |t|
      t.string :xml_id
      t.string :line_number
      t.string :type
      t.belongs_to :french_scene, null: false, foreign_key: true
      t.text :notes

      t.timestamps
    end
  end
end
