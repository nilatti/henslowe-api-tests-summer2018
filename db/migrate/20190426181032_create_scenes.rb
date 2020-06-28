class CreateScenes < ActiveRecord::Migration[5.1]
  def change
    create_table :scenes do |t|
      t.integer :number
      t.text :summary
      t.references :act

      t.timestamps
    end
  end
end
