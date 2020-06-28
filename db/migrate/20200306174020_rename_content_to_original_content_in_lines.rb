class RenameContentToOriginalContentInLines < ActiveRecord::Migration[6.0]
  def change
    rename_column :lines, :content, :original_content
  end
end
