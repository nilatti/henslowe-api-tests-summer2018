module Types
  class StageDirectionType < Types::BaseObject
    field :character, Types::CharacterType, null: true
    field :characterGroup, Types::CharacterGroupType, null: true
    field :frenchScene, Types::FrenchSceneType, null: false
    field :id, ID, null: false
    field :kind, String, null: true
    field :newContent, String, null: true
    field :number, String, null: true
    field :originalContent, String, null: true
    field :xmlId, String, null: true

  end
end
