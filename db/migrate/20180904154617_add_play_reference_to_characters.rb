class AddPlayReferenceToCharacters < ActiveRecord::Migration[5.1]
  def change
    add_reference :characters, :play
  end
end
