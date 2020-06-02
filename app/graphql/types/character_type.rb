module Types
  class CharacterType < Types::BaseObject
    field :age, String, null: true
    field :characterGroup, Types::CharacterGroupType, null: true
    field :corresp, String, null: true
    field :description, String, null: true
    field :gender, String, null: true
    field :name, String, null: false
    field :play, Types::PlayType, null: false
    field :xmlId, String, null: true
  end
end
