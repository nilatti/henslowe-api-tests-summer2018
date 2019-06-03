class AddDetailFieldsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string
    add_column :users, :middle_name, :string
    add_column :users, :last_name, :string
    add_column :users, :phone_number, :string
    add_column :users, :birthdate, :date
    add_column :users, :timezone, :string
    add_column :users, :gender, :string
    add_column :users, :bio, :text
    add_column :users, :description, :text
    add_column :users, :street_address, :string
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :zip, :string
    add_column :users, :website, :string
    add_column :users, :emergency_contact_name, :string
    add_column :users, :emergency_contact_number, :string
  end
end
