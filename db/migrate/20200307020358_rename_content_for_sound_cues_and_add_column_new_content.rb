class RenameContentForSoundCuesAndAddColumnNewContent < ActiveRecord::Migration[6.0]
  def change
    rename_column :sound_cues, :content, :original_content
    add_column :sound_cues, :new_content, :text
  end
end
