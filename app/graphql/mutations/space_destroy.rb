class Mutations::SpaceDestroy < Mutations::BaseMutation
  argument :id, ID, required: true
  field :space, Types::SpaceType, null: false
  def resolve(id:)
    space = Space.find(id)
    space.destroy
    {
        space: space,
        result: space.errors.blank?
      }
  end
end
