class CreateCharacterGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :character_groups do |t|
      t.string :name
      t.string :xml_id
      t.string :corresp
      t.belongs_to :play, null: false, foreign_key: true

      t.timestamps
    end
  end
end
