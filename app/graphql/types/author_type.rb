module Types
  class AuthorType < Types::BaseObject
    field :birthdate, String, null: true
    field :deathdate, String, null: true
    field :id, ID, null: false
    field :first_name, String, null: true
    field :gender, String, null: true
    field :last_name, String, null: true
    field :middle_name, String, null: true
    field :nationality, String, null: true
    field :plays, [Types::PlayType], null: true
  end
end
