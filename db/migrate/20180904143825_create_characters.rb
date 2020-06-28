class CreateCharacters < ActiveRecord::Migration[5.1]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :age
      t.string :gender
      t.text :description

      t.timestamps
    end
  end
end
