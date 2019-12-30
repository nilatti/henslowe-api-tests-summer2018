class AddCorrespToCharacters < ActiveRecord::Migration[6.0]
  def change
    add_column :characters, :corresp, :string
  end
end
