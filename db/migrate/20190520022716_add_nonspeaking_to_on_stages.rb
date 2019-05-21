class AddNonspeakingToOnStages < ActiveRecord::Migration[5.1]
  def change
    add_column :on_stages, :nonspeaking, :boolean, default: false
  end
end
