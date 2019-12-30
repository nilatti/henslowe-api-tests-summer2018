class AddSynopsisToPlays < ActiveRecord::Migration[6.0]
  def change
    add_column :plays, :synopsis, :text
  end
end
