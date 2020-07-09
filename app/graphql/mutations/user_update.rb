class Mutations::UserUpdate < Mutations::BaseMutation
  argument :bio, String, required: false
  argument :birthdate, String, required: false
  argument :city, String, required: false
  argument :description, String, required: false
  argument :email, String, required: true
  argument :emergencyContactName, String, required: false
  argument :emergencyContactNumber, String, required: false
  argument :firstName, String, required: false
  argument :gender, String, required: false
  argument :id, String, required: false
  argument :lastName, String, required: true
  argument :middleName, String, required: false
  argument :password, String, required: false
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
    email: nil,
    emergencyContactName: nil,
    emergencyContactNumber: nil,
    firstName: nil,
    gender: nil,
    id:,
    lastName: nil,
    middleName: nil,
    password: nil,
    phoneNumber: nil,
    preferredName: nil,
    programName: nil,
    state: nil,
    streetAddress: nil,
    timezone: nil,
    website: nil,
    zip: nil
  )
      user = User.find(id)
      user.update(
        bio: bio ? bio: user.bio,
        birthdate: birthdate ? birthdate : user.birthdate,
        city: city ? city: user.city,
        description: description ? description : user.description,
        email: email ? email : user.email,
        emergency_contact_name: emergencyContactName ? emergencyContactName : user.emergency_contact_name,
        emergency_contact_number: emergencyContactNumber ? emergencyContactNumber : user.emergency_contact_number,
        first_name: firstName ? firstName : user.first_name,
        gender: gender ? gender : user.gender,
        id: id,
        last_name: lastName ? lastName : user.last_name,
        middle_name: middleName ? middleName : user.middle_name,
        password: password ? password : user.password,
        phone_number: phoneNumber ? phoneNumber : user.phone_number,
        preferred_name: preferredName ? preferredName : user.preferred_name,
        program_name: programName ? programName : user.program_name,
        state: state ? state : user.state,
        street_address: streetAddress ? streetAddress : user.street_address,
        timezone: timezone ? timezone : user.timezone,
        website: website ? website : user.website,
        zip: zip ? zip : user.zip,

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
