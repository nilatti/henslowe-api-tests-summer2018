module Types
  class ProductionType < Types::BaseObject
    field :endDate, String, null: true
    field :id, ID, null: false
    field :lines_per_minute, Int, null: true
    field :stageExits, [Types::StageExitType], null: true
    field :startDate, String, null: true
    field :theater, Types::TheaterType, null: false
  end
end
