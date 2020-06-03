module Types
  class SpaceType < Types::BaseObject
    field :city, String, null: true
    field :id, ID, null: false
    field :name, String, null: false
    field :phoneNumber, String, null: true
    field :missionStatement, String, null: true
    field :seatingCapacity, Int, null: true
    field :state, String, null: true
    field :streetAddress, String, null: true
    field :website, String, null: true
    field :zip, String, null: true
  end
end
