module Mutations
  class SignUp < Mutations::BaseMutation
    graphql_name "SignUp"

    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true

    field :user, Types::UserType, null: false

    def resolve(args)
      user = User.create!(args)
      context[:current_user] = user
      return {user: user, success: user.persisted?, errors: user.errors}
      rescue ActiveRecord::RecordInvalid => invalid
        GraphQL::ExecutionError.new(
          "Invalid Attributes for #{invalid.record.class.name}: " \
          "#{invalid.record.errors.full_messages.join(', ')}"
        )
      end
    end
  end
