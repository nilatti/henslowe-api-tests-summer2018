class Mutations::SpecializationDestroy < Mutations::BaseMutation
  argument :id, Integer, required: true
  field :specialization, Types::SpecializationType, null: false
  def resolve(id:)
    specialization = Specialization.find(id)
    specialization.destroy
    {
        specialization: specialization,
        result: specialization.errors.blank?
      }
  end
end
