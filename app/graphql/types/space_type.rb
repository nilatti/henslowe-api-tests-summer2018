module Types
  class SpaceType < Types::BaseObject
    field :city, String, null: true
    field :id, ID, null: false
    field :logo, String, null: true
    field :mission_statement, String, null: true
    field :name, String, null: false
    field :phone_number, String, null: true
    field :seating_capacity, Int, null: true
    field :state, String, null: true
    field :street_address, String, null: true
    field :website, String, null: true
    field :zip, String, null: true
  end
end
