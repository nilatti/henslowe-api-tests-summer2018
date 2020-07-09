class Mutations::TheaterUpdate < Mutations::BaseMutation
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
    calendarUrl: nil,
    city: nil,
    id:,
    missionStatement: nil,
    name: nil,
    phoneNumber: nil,
    state: nil,
    streetAddress: nil,
    website: nil,
    zip: nil
  )
      theater = Theater.find(id)
      theater.update(
        calendar_url: calendarUrl ? calendarUrl : theater.calendar_url,
        city: city ? city : theater.city,
        mission_statement: missionStatement ? missionStatement : theater.missionStatement,
        name: name ? name : theater.name,
        phone_number: phoneNumber ? phoneNumber : theater.phone_number,
        state: state ? state : theater.state,
        street_address: streetAddress ? streetAddress : theater.street_address,
        website: website ? website : theater.website,
        zip: zip ? zip : theater.zip,

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
