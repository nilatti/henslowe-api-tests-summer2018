class AuthorSerializer
  include JSONAPI::Serializer
  attributes :birthdate, :deathdate, :nationality, :first_name, :middle_name, :last_name, :gender
  has_many :plays
end