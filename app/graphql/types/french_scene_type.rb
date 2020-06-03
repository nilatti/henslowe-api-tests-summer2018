module Types
  class FrenchSceneType < Types::BaseObject
    field :endPage, Int, null: true
    field :id, ID, null: false
    field :number, String, null: false
    field :rehearsals, [Types::RehearsalType], null: true
    field :scene, Types::SceneType, null: false
    field :startPage, Int, null: true
    field :summary, String, null: true
  end
end
