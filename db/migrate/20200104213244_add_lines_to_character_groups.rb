class AddLinesToCharacterGroups < ActiveRecord::Migration[6.0]
  def change
    add_reference :lines, :character_group, null: true, foreign_key: true
  end
end
