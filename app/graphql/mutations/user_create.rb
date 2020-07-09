class Mutations::UserCreate < Mutations::BaseMutation
  argument :bio, String, required: false
  argument :birthdate, String, required: false
  argument :city, String, required: false
  argument :description, String, required: false
  argument :email, String, required: true
  argument :emergencyContactName, String, required: false
  argument :emergencyContactNumber, String, required: false
  argument :firstName, String, required: false
  argument :gender, String, required: false
  argument :id, Integer, required: false
  argument :lastName, String, required: true
  argument :middleName, String, required: false
  argument :password, String, required: true
  argument :phoneNumber, String, required: false
  argument :preferredName, String, required: false
  argument :programName, String, required: false
  argument :state, String, required: false
  argument :streetAddress, String, required: false
  argument :timezone, String, required: false
  argument :website, String, required: false
  argument :zip, String, required: false

  field :user, Types::UserType, null: false
  field :errors, [String], null: false

  def resolve(
    bio: nil,
    birthdate: nil,
    city: nil,
    description: nil,
    email:,
    emergencyContactName: nil,
    emergencyContactNumber: nil,
    firstName:,
    gender: nil,
    lastName:,
    middleName: nil,
    password:,
    phoneNumber: nil,
    preferredName: nil,
    programName: nil,
    state: nil,
    streetAddress: nil,
    timezone: nil,
    website: nil,
    zip: nil
  )
      user = User.new(
        bio: bio,
        birthdate: birthdate,
        city: city,
        description: description,
        email: email,
        emergency_contact_name: emergencyContactName,
        emergency_contact_number: emergencyContactNumber,
        first_name: firstName,
        gender: gender,
        last_name: lastName,
        middle_name: middleName,
        password: password,
        phone_number: phoneNumber,
        preferred_name: preferredName,
        program_name: programName,
        state: state,
        street_address: streetAddress,
        timezone: timezone,
        website: website,
        zip: zip,
      )
        if user.save
      {
        user: user,
        errors: []
      }
    else
      {
        user: nil,
        errors: user.errors.full_messages
      }
    end
  end
end
