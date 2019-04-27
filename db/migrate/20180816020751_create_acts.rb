class CreateActs < ActiveRecord::Migration[5.1]
  def change
    create_table :acts do |t|
      t.integer :number
      t.references :play, foreign_key: true
      t.text :summary
      t.integer :start_page
      t.integer :end_page

      t.timestamps
    end
  end
end
