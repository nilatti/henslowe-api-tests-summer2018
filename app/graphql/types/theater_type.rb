module Types
  class TheaterType < Types::BaseObject
    field :calendarUrl, String, null: true
    field :city, String, null: true
    field :id, ID, null: false
    field :missionStatement, String, null: true
    field :name, String, null: false
    field :phoneNumber, String, null: true
    field :state, String, null: true
    field :streetAddress, String, null: true
    field :website, String, null: true
    field :zip, String, null: true
  end
end
