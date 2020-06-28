class AddHeadingToScene < ActiveRecord::Migration[6.0]
  def change
    add_column :scenes, :heading, :string
  end
end
