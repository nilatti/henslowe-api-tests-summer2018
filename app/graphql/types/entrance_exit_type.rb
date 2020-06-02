module Types
  class EntranceExitType < Types::BaseObject
    field :category, String, null: true
    field :frenchScene, Types::FrenchSceneType, null: false
    field :line, Int, null: true
    field :notes, String, null: true
    field :order, Int, null: true
    field :page, Int, null: true
    field :stageExit, Types::StageExitType, null: true
  end
end
