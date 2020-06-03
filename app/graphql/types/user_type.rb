module Types
  class UserType < Types::BaseObject
    field :bio, String, null: true
    field :birthdate, String, null: true
    field :city, String, null: true
    field :description, String, null: true
    field :email, String, null: false
    field :emergencyContactName, String, null: true
    field :emergencyContactNumber, String, null: true
    field :encryptedPassword, String, null: false
    field :firstName, String, null: true
    field :gender, String, null: true
    field :id, ID, null: false
    field :lastName, String, null: true
    field :middleName, String, null: true
    field :phoneNumber, String, null: true
    field :preferredName, String, null: true
    field :programName, String, null: true
    field :rehearsals, [Types::RehearsalType], null: true
    field :resetPasswordToken, String, null: true
    field :state, String, null: true
    field :streetAddress, String, null: true
    field :timezone, String, null: true
    field :website, String, null: true
    field :zip, String, null: true
  end
end
