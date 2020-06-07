module Types
  class ProductionType < Types::BaseObject
    field :endDate, String, null: true
    field :id, ID, null: false
    field :jobs, [Types::JobType], null: true
    field :lines_per_minute, Int, null: true
    field :play, Types::PlayType, null: true
    field :rehearsals, [Types::RehearsalType], null: true
    field :stageExits, [Types::StageExitType], null: true
    field :startDate, String, null: true
    field :theater, Types::TheaterType, null: false
  end
end
