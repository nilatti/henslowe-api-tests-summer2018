module Types
  class SceneType < Types::BaseObject
    field :act, Types::ActType, null: false
    field :end_page, Int, null: true
    field :french_scenes, [Types::FrenchSceneType], null: false
    field :heading, String, null: true
    field :id, ID, null: false
    field :number, Int, null: false
    field :rehearsals, [Types::RehearsalType], null: true
    field :start_page, Int, null: true
    field :summary, String, null: true

  end
end
