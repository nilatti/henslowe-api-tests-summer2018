class Mutations::UpdateTheater < Mutations::BaseMutation
  argument :calendarUrl, String, required: false
  argument :city, String, required: false
  argument :id, ID, required: true
  argument :missionStatement, String, required: false
  argument :name, String, required: true
  argument :phoneNumber, String, required: false
  argument :state, String, required: false
  argument :streetAddress, String, required: false
  argument :website, String, required: false
  argument :zip, String, required: false

  field :theater, Types::TheaterType, null: false
  field :errors, [String], null: false

  def resolve(
    calendarUrl:,
    city:,
    id:,
    missionStatement:,
    name:,
    phoneNumber:,
    state:,
    streetAddress:,
    website:,
    zip:
  )
      theater = Theater.find(id)
      theater.update(
        calendar_url: calendarUrl,
        city: city,
        mission_statement: missionStatement,
        name: name,
        phone_number: phoneNumber,
        state: state,
        street_address: streetAddress,
        website: website,
        zip: zip,

      )
        if theater.save
      {
        theater: theater,
        errors: []
      }
    else
      {
        theater: nil,
        errors: theater.errors.full_messages
      }
    end
  end
end
