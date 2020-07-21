class Mutations::SpecializationUpdate < Mutations::BaseMutation
  argument :description, String, required: false
  argument :id, ID, required: true
  argument :title, String, required: true

  field :specialization, Types::SpecializationType, null: false
  field :errors, [String], null: false

  def resolve(
    description: nil,
    id:,
    title: nil
  )
      specialization = Specialization.find(id)
      specialization.update(
        description: description ? description : specialization.description,
        title: title ? title : specialization.title
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
