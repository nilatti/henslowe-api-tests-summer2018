module Types
  class SoundCueType < Types::BaseObject
    field :frenchScene, Types::FrenchSceneType, null: false
    field :id, ID, null: false
    field :kind, String, null: true
    field :lineNumber, String, null: true
    field :new_content, String, null: true
    field :notes, String, null: true
    field :original_content, String, null: true
    field :xmlId, String, null: true
  end
end
