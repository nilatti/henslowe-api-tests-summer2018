class CreateFrenchScenes < ActiveRecord::Migration[5.1]
  def change
    create_table :french_scenes do |t|
      t.belongs_to :scene, foreign_key: true
      t.string :number
      t.text :summary

      t.timestamps
    end
  end
end
