module Types
  class MeType < Types::BaseObject
    field :bio, String, null: true
    field :birthdate, String, null: true
    field :city, String, null: true
    field :description, String, null: true
    field :email, String, null: true
    field :emergency_contact_name, String, null: true
    field :emergency_contact_number, String, null: true
    field :encrypted_password, String, null: true
    field :first_name, String, null: true
    field :gender, String, null: true
    field :id, ID, null: true
    field :last_name, String, null: true
    field :middle_name, String, null: true
    field :phone_number, String, null: true
    field :preferred_name, String, null: true
    field :program_name, String, null: true
    field :rehearsals, [Types::RehearsalType], null: true
    field :reset_password_token, String, null: true
    field :state, String, null: true
    field :street_address, String, null: true
    field :timezone, String, null: true
    field :website, String, null: true
    field :zip, String, null: true
  end
end
