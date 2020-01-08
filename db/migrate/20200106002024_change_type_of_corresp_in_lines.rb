class ChangeTypeOfCorrespInLines < ActiveRecord::Migration[6.0]
  def change
    change_column :lines, :corresp, :text
  end
end
