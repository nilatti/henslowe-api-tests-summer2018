class AddPlayToWords < ActiveRecord::Migration[6.0]
  def change
    add_reference :words, :play, null: false, foreign_key: true
  end
end
