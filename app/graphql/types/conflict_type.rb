module Types
  class ConflictType < Types::BaseObject
    field :category, String, null: true
    field :endTime, String, null: false
    field :space, Types::SpaceType, null: true
    field :startTime, String, null: false
    field :user, Types::UserType, null: true

  end
end
