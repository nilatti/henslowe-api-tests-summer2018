class AddOriginalPlayToPlays < ActiveRecord::Migration[5.2]
  def change
    add_column :plays, :original_play_id, :integer
  end
end
