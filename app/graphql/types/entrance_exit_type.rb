module Types
  class EntranceExitType < Types::BaseObject
    field :category, String, null: true
    field :character, Types::CharacterType, null: true
    field :character_group, Types::CharacterGroupType, null: true
    field :french_scene, Types::FrenchSceneType, null: false
    field :id, ID, null: false
    field :line, Int, null: true
    field :notes, String, null: true
    field :order, Int, null: true
    field :page, Int, null: true
    field :stage_exit, Types::StageExitType, null: true
  end
end
