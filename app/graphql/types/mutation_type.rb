module Types
  class MutationType < Types::BaseObject
    field :create_author, mutation: Mutations::CreateAuthor
    field :create_space, mutation: Mutations::CreateSpace
    field :create_specialization, mutation: Mutations::CreateSpecialization
    field :create_theater, mutation: Mutations::CreateTheater
    field :create_user, mutation: Mutations::CreateUser
    field :update_author, mutation: Mutations::UpdateAuthor
  end
end
