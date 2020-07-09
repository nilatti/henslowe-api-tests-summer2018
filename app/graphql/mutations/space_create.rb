class Mutations::SpaceCreate < Mutations::BaseMutation
  argument :city, String, required: false
  argument :missionStatement, String, required: false
  argument :name, String, required: true
  argument :phoneNumber, String, required: false
  argument :seatingCapacity, Int, required: false
  argument :state, String, required: false
  argument :streetAddress, String, required: false
  argument :website, String, required: false
  argument :zip, String, required: false

  field :space, Types::SpaceType, null: false
  field :errors, [String], null: false

  def resolve(
    city: nil,
    missionStatement: nil,
    name:,
    phoneNumber: nil,
    seatingCapacity: nil,
    state: nil,
    streetAddress: nil,
    website: nil,
    zip: nil
  )
      space = Space.new(
        city: city,
        mission_statement: missionStatement,
        name: name,
        phone_number: phoneNumber,
        seating_capacity: seatingCapacity,
        state: state,
        street_address: streetAddress,
        website: website,
        zip: zip
      )
        if space.save
      {
        space: space,
        errors: []
      }
    else
      {
        space: nil,
        errors: space.errors.full_messages
      }
    end
  end
end
