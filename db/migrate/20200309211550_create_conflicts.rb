class CreateConflicts < ActiveRecord::Migration[6.0]
  def change
    create_table :conflicts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.datetime :start_time
      t.datetime :end_time
      t.string :category
      t.belongs_to :space, null: false, foreign_key: true

      t.timestamps
    end
  end
end
