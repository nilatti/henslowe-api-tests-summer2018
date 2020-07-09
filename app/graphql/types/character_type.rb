module Types
  class CharacterType < Types::BaseObject
    field :age, String, null: true
    field :character_group, Types::CharacterGroupType, null: true
    field :corresp, String, null: true
    field :description, String, null: true
    field :entrance_exit, [Types::EntranceExitType], null: true
    field :gender, String, null: true
    field :id, ID, null: false
    field :name, String, null: false
    field :play, Types::PlayType, null: false
    field :stage_directions, [Types::StageDirectionType], null: true
    field :xml_id, String, null: true
  end
end
