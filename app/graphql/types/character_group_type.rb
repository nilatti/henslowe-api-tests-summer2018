module Types
  class CharacterGroupType < Types::BaseObject
    field :corresp, String, null: true
    field :entranceExit, [Types::EntranceExitType], null: true
    field :id, ID, null: false
    field :name, String, null: false
    field :play, Types::PlayType, null: false
    field :stageDirections, [Types::StageDirectionType], null: true
    field :xmlId, String, null: true
  end
end
