module Types
  class JobType < Types::BaseObject
    field :character, Types::CharacterType, null: true
    field :end_date, String, null: true
    field :id, ID, null: false
    field :production, Types::ProductionType, null: true
    field :specialization, Types::SpecializationType, null: true
    field :start_date, String, null: true
    field :theater, Types::TheaterType, null: true
    field :user, Types::UserType, null: true
  end
end
