class CreatePlays < ActiveRecord::Migration[5.1]
  def change
    create_table :plays do |t|
      t.string :title
      t.references :author, foreign_key: true
      t.date :date
      t.string :genre

      t.timestamps
    end
  end
end
