class AllowNullLineIdInWords < ActiveRecord::Migration[6.0]
  def change
        change_column_null(:words, :line_id, true)
  end
end
