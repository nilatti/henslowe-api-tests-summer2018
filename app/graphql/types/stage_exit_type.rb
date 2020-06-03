module Types
  class StageExitType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :production, Types::ProductionType, null: false

  end
end
