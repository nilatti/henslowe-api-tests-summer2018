module Types
  class JobType < Types::BaseObject
    field :character, Types::CharacterType, null: true
    field :endDate, String, null: true
    field :production, Types::ProductionType, null: true
    field :specialization, Types::SpecializationType, null: true
    field :startDate, String, null: true
    field :theater, Types::TheaterType, null: true
    field :user, Types::UserType, null: true
  end
end
