class AddHeadingToAct < ActiveRecord::Migration[6.0]
  def change
    add_column :acts, :heading, :string
  end
end
