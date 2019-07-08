class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.belongs_to :production, foreign_key: true
      t.belongs_to :specialization, foreign_key: true
      t.belongs_to :user, foreign_key: true
      t.date :start_date
      t.date :end_date
      t.belongs_to :theater, foreign_key: true

      t.timestamps
    end
  end
end
