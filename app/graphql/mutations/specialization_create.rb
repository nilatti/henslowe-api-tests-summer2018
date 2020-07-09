class Mutations::SpecializationCreate < Mutations::BaseMutation
  argument :description, String, required: false
  argument :title, String, required: true

  field :specialization, Types::SpecializationType, null: false
  field :errors, [String], null: false

  def resolve(
    description: nil,
    title:
  )
      specialization = Specialization.new(
        description: description,
        title: title
      )
        if specialization.save
      {
        specialization: specialization,
        errors: []
      }
    else
      {
        specialization: nil,
        errors: specialization.errors.full_messages
      }
    end
  end
end
