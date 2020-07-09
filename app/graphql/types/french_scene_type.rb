module Types
  class FrenchSceneType < Types::BaseObject
    field :end_page, Int, null: true
    field :id, ID, null: false
    field :number, String, null: false
    field :rehearsals, [Types::RehearsalType], null: true
    field :scene, Types::SceneType, null: false
    field :start_page, Int, null: true
    field :summary, String, null: true
  end
end
