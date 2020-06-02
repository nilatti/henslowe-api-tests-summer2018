module Types
  class FrenchSceneType < Types::BaseObject
    field :endPage, Int, null: true
    field :number, String, null: false
    field :scene, Types::SceneType, null: false
    field :startPage, Int, null: true
    field :summary, String, null: true
  end
end
