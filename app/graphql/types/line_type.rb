module Types
  class LineType < Types::BaseObject
    field :ana, String, null: true
    field :character, Types::CharacterType, null: true
    field :characterGroup, Types::CharacterGroupType, null: true
    field :corresp, String, null: true
    field :frenchScene, Types::FrenchSceneType, null: false
    field :id, ID, null: false
    field :kind, String, null: true
    field :new_content, String, null: true
    field :new_line_count, Int, null: true
    field :next, String, null: true
    field :number, String, null: true
    field :original_content, String, null: false
    field :original_line_count, Int, null: true
    field :prev, String, null: true
    field :xml_id, String, null: true
  end
end
