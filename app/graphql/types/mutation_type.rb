module Types
  class MutationType < Types::BaseObject
    field :author_create, mutation: Mutations::AuthorCreate
    field :author_destroy, mutation: Mutations::AuthorDestroy
    field :author_update, mutation: Mutations::AuthorUpdate
    field :space_create, mutation: Mutations::SpaceCreate
    field :space_update, mutation: Mutations::SpaceUpdate
    field :specialization_create, mutation: Mutations::SpecializationCreate
    field :specialization_update, mutation: Mutations::SpecializationUpdate
    field :theater_create, mutation: Mutations::TheaterCreate
    field :theater_update, mutation: Mutations::TheaterUpdate
    field :user_create, mutation: Mutations::UserCreate
    field :user_update, mutation: Mutations::UserUpdate
  end
end
