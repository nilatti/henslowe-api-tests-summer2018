module Types
  class SoundCueType < Types::BaseObject
    field :french_scene, Types::FrenchSceneType, null: false
    field :id, ID, null: false
    field :kind, String, null: true
    field :line_number, String, null: true
    field :new_content, String, null: true
    field :notes, String, null: true
    field :original_content, String, null: true
    field :xml_id, String, null: true
  end
end
