class CreateProductions < ActiveRecord::Migration[5.1]
  def change
    create_table :productions do |t|
      t.date :start_date
      t.date :end_date
      t.belongs_to :theater, foreign_key: true

      t.timestamps
    end
  end
end
