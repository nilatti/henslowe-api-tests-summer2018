class AddCharacterGroupToOnStages < ActiveRecord::Migration[6.0]
  def change
    add_reference :on_stages, :character_group, null: true, foreign_key: true
  end
end
