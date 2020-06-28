class AddContentToSoundCues < ActiveRecord::Migration[6.0]
  def change
    add_column :sound_cues, :content, :string
  end
end
