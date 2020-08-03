class AddLogoToSpaces < ActiveRecord::Migration[6.0]
  def change
    add_column :spaces, :logo, :string
  end
end
