class Mutations::UpdateAuthor < Mutations::BaseMutation
  argument :birthdate, String, required: false
  argument :deathdate, String, required: false
  argument :firstName, String, required: false
  argument :gender, String, required: false
  argument :id, ID, required: true
  argument :lastName, String, required: true
  argument :middleName, String, required: false
  argument :nationality, String, required: false

  field :author, Types::AuthorType, null: false
  field :errors, [String], null: false

  def resolve(
    birthdate:,
    deathdate:,
    firstName:,
    gender:,
    id:,
    lastName:,
    middleName:,
    nationality:
  )
      author = Author.find(id)
        author.update(
          birthdate: birthdate,
          deathdate: deathdate,
          first_name: firstName,
          gender: gender,
          last_name: lastName,
          middle_name: middleName,
          nationality: nationality
        )

      if author.save
    {
      author: author,
      errors: []
    }
    else
      {
        author: nil,
        errors: author.errors.full_messages
      }
    end
  end
end
