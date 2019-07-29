class AddCategoryToEntranceExit < ActiveRecord::Migration[5.2]
  def change
    add_column :entrance_exits, :category, :string
  end
end
