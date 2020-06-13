class Mutations::UpdateSpecialization < Mutations::BaseMutation
  argument :description, String, required: false
  argument :id, ID, required: true
  argument :title, String, required: true

  field :specialization, Types::SpecializationType, null: false
  field :errors, [String], null: false

  def resolve(
    description:,
    id:,
    title:
  )
      specialization = Specialization.find(id)
      specialization.update(
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
