module Mutations
  class SignOut < Mutations::BaseMutation
    graphql_name "SignOut"

    field :user, Types::UserType, null: true
    field :message, String, null: true

    def resolve
      user = context[:current_user]
      if user.present?
        success = user.restore_authentication_token!
        return {message: "Signed out!", success: success, errors: user.errors}
      else
        GraphQL::ExecutionError.new("User not signed in")
      end
    end
  end
end
