class AddLogoToTheaters < ActiveRecord::Migration[6.0]
  def change
   add_column :theaters, :logo, :string
  end
end
