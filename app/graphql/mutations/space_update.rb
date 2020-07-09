class Mutations::SpaceUpdate < Mutations::BaseMutation
  argument :city, String, required: false
  argument :id, ID, required: true
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
    id:,
    missionStatement: nil,
    name: nil,
    phoneNumber: nil,
    seatingCapacity: nil,
    state: nil,
    streetAddress: nil,
    website: nil,
    zip: nil
  )
      space = Space.find(id)
      space.update(
        city: city ? city : space.city,
        mission_statement: missionStatement ? missionStatement : space.mission_statement,
        name: name ? name : space.name,
        phone_number: phoneNumber ? phoneNumber : space.phone_number,
        seating_capacity: seatingCapacity ? seatingCapacity : space.seating_capacity,
        state: state ? state : space.state,
        street_address: streetAddress ? streetAddress : space.street_address,
        website: website ? website : space.website,
        zip: zip ? zip : space.zip,
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
