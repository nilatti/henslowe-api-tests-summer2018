module Types
  class ProductionType < Types::BaseObject
    field :end_date, String, null: true
    field :id, ID, null: false
    field :jobs, [Types::JobType], null: true
    field :lines_per_minute, Int, null: true
    field :play, Types::PlayType, null: true
    field :rehearsals, [Types::RehearsalType], null: true
    field :stage_exits, [Types::StageExitType], null: true
    field :start_date, String, null: true
    field :theater, Types::TheaterType, null: false
  end
end
