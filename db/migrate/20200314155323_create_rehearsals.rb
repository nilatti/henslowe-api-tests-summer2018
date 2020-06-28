class CreateRehearsals < ActiveRecord::Migration[6.0]
  def change
    create_table :rehearsals do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.belongs_to :space, null: false, foreign_key: true
      t.text :notes
      t.string :title
      t.belongs_to :production, null: false, foreign_key: true

      t.timestamps
    end
  end
end
