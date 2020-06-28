class CreateWords < ActiveRecord::Migration[6.0]
  def change
    create_table :words do |t|
      t.string :type
      t.string :content
      t.string :xml_id
      t.belongs_to :line, null: false, foreign_key: true
      t.string :line_number

      t.timestamps
    end
  end
end
