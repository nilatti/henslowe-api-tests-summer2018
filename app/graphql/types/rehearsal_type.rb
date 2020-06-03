module Types
  class RehearsalType < Types::BaseObject
    field :acts, [Types::ActType], null: true
    field :endTime, String, null: false
    field :frenchScenes, [Types::FrenchSceneType], null: true
    field :id, ID, null: false
    field :notes, String, null: true
    field :production, Types::ProductionType, null: false
    field :scenes, [Types::SceneType], null: true
    field :space, Types::SpaceType, null: true
    field :startTime, String, null: false
    field :title, String, null: true
    field :users, [Types::UserType], null: true

  end
end
