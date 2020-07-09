class Mutations::TheaterDestroy < Mutations::BaseMutation
  argument :id, Integer, required: true
  field :theater, Types::TheaterType, null: false
  def resolve(id:)
    theater = Theater.find(id)
    theater.destroy
    {
        theater: theater,
        result: theater.errors.blank?
      }
  end
end
