module Types
  class MutationType < Types::BaseObject
    field :author_create, mutation: Mutations::AuthorCreate
    field :author_destroy, mutation: Mutations::AuthorDestroy
    field :author_update, mutation: Mutations::AuthorUpdate
    field :space_create, mutation: Mutations::SpaceCreate
    field :space_destroy, mutation: Mutations::SpaceDestroy
    field :space_update, mutation: Mutations::SpaceUpdate
    field :specialization_create, mutation: Mutations::SpecializationCreate
    field :specialization_destroy, mutation: Mutations::SpecializationDestroy
    field :specialization_update, mutation: Mutations::SpecializationUpdate
    field :theater_create, mutation: Mutations::TheaterCreate
    field :theater_destroy, mutation: Mutations::TheaterDestroy
    field :theater_update, mutation: Mutations::TheaterUpdate
    field :user_create, mutation: Mutations::UserCreate
    field :user_destroy, mutation: Mutations::UserDestroy
    field :user_update, mutation: Mutations::UserUpdate
    field :sign_in, mutation: Mutations::SignIn
    field :sign_out, mutation: Mutations::SignOut
    field :sign_up, mutation: Mutations::SignUp
  end
end
