module Types
  class StageDirectionType < Types::BaseObject
    field :character, Types::CharacterType, null: true
    field :character_group, Types::CharacterGroupType, null: true
    field :french_scene, Types::FrenchSceneType, null: false
    field :id, ID, null: false
    field :kind, String, null: true
    field :new_content, String, null: true
    field :number, String, null: true
    field :original_content, String, null: true
    field :xml_id, String, null: true

  end
end
