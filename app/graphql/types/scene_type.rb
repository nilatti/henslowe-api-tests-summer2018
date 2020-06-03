module Types
  class SceneType < Types::BaseObject
    field :act, Types::ActType, null: false
    field :endPage, Int, null: true
    field :heading, String, null: true
    field :id, ID, null: false
    field :number, Int, null: false
    field :rehearsals, [Types::RehearsalType], null: true
    field :startPage, Int, null: true
    field :summary, String, null: true

  end
end
