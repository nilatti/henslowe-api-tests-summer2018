module Types
  class OnStageType < Types::BaseObject
    field :category, String, null: true
    field :character, Types::CharacterType, null: true
    field :characterGroup, Types::CharacterGroupType, null: true
    field :description, String, null: true
    field :frenchScene, Types::FrenchSceneType, null: false
    field :id, ID, null: false
    field :nonspeaking, Boolean, null: false
    field :user, Types::UserType, null: true
  end
end
