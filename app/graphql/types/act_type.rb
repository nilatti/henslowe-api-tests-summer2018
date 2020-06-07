module Types
  class ActType < Types::BaseObject
    field :endPage, Int, null: true
    field :heading, String, null: true
    field :id, ID, null: false
    field :number, Int, null: false
    field :play, Types::PlayType, null: false
    field :rehearsals, [Types::RehearsalType], null: true
    field :scenes, [Types::SceneType], null: false
    field :summary, String, null: true
    field :startPage, Int, null: true
  end
end
