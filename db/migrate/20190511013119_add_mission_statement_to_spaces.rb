class AddMissionStatementToSpaces < ActiveRecord::Migration[5.1]
  def change
    add_column :spaces, :mission_statement, :text
  end
end
