class AddXmlIdToCharacters < ActiveRecord::Migration[5.1]
  def change
    add_column :characters, :xml_id, :string
  end
end
