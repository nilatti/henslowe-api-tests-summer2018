module Types
  class ActType < Types::BaseObject
    field :id, ID, null: false
    field :endPage, Int, null: true
    field :heading, String, null: true
    field :number, Int, null: false
    field :play, Types::PlayType, null: false
    field :summary, String, null: true
    field :startPage, Int, null: true
  end
end
