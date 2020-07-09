class Mutations::AuthorDestroy < Mutations::BaseMutation
  argument :id, Integer, required: true
  field :author, Types::AuthorType, null: false
  def resolve(id:)
    author = Author.find(id)
    author.destroy
    {
        author: author,
        result: author.errors.blank?
      }
  end
end
