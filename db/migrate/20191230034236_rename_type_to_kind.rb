class RenameTypeToKind < ActiveRecord::Migration[6.0]
  def change
    rename_column :lines, :type, :kind
    rename_column :sound_cues, :type, :kind
    rename_column :words, :type, :kind

  end
end
