class Mutations::AuthorUpdate < Mutations::BaseMutation
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
    birthdate: nil,
    deathdate: nil,
    firstName: nil,
    gender: nil,
    id:,
    lastName: nil,
    middleName: nil,
    nationality: nil
  )
      author = Author.find(id)
        author.update(
          birthdate: birthdate ? birthdate : author.birthdate,
          deathdate: deathdate ? deathdate : author.deathdate,
          first_name: firstName ? firstName : author.first_name,
          gender: gender ? gender : author.gender,
          last_name: lastName ? lastName : author.last_name,
          middle_name: middleName ? middleName : author.middle_name,
          nationality: nationality ? nationality : author.nationality
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
