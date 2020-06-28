class AddNewContentToLines < ActiveRecord::Migration[6.0]
  def change
    add_column :lines, :new_content, :text
  end
end
