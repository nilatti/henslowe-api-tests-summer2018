module Types
  class CharacterGroupType < Types::BaseObject
    field :corresp, String, null: true
    field :name, String, null: false
    field :play, Types::PlayType, null: false
    field :xmlId, String, null: true
  end
end
