class AddContentToLines < ActiveRecord::Migration[6.0]
  def change
    add_column :lines, :content, :text
  end
end
