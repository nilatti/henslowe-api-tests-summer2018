class CreateOnStages < ActiveRecord::Migration[5.1]
  def change
    create_table :on_stages do |t|
      t.bigint :character_id, foreign_key: true
      t.bigint :user, foreign_key: true
      t.bigint :french_scene, foreign_key: true
      t.text :description
      t.text :category

      t.timestamps
    end
  end
end
