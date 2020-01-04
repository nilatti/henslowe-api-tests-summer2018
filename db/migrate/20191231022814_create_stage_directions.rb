class CreateStageDirections < ActiveRecord::Migration[6.0]
  def change
    create_table :stage_directions do |t|
      t.belongs_to :french_scene, null: false, foreign_key: true
      t.string :number
      t.string :kind
      t.string :xml_id
      t.string :content

      t.timestamps
    end
  end
end
