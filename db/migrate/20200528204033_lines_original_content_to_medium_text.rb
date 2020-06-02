class LinesOriginalContentToMediumText < ActiveRecord::Migration[6.0]
  def change
    change_column :lines, :original_content, :mediumtext
  end
end
