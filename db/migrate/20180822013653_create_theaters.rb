class CreateTheaters < ActiveRecord::Migration[5.1]
  def change
    create_table :theaters do |t|
      t.string :name
      t.string :street_address
      t.string :city
      t.string :state
      t.string :zip
      t.string :phone_number
      t.text :mission_statement
      t.string :website
      t.string :calendar_url

      t.timestamps
    end
  end
end
