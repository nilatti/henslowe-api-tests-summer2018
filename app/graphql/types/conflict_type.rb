module Types
  class ConflictType < Types::BaseObject
    field :category, String, null: true
    field :end_time, String, null: false
    field :id, ID, null: false
    field :space, Types::SpaceType, null: true
    field :start_time, String, null: false
    field :user, Types::UserType, null: true

  end
end
