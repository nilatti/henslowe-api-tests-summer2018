class CreateAuthors < ActiveRecord::Migration[5.1]
  def change
    create_table :authors do |t|
      t.date :birthdate
      t.date :deathdate
      t.string :nationality
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :gender

      t.timestamps
    end
  end
end
