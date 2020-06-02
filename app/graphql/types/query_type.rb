module Types
  class QueryType < Types::BaseObject
    field :authors,
      [Types::AuthorType],
      null: false,
      description: "Returns a list of authors"
    field :plays,
      [Types::PlayType],
      null: false,
      description: "Returns a list of plays"

    field :play,
      Types::PlayType,
      null: false,
      description: "Returns one play" do
        argument :id, ID, required: true
      end




    def plays
      Play.all
    end
    def play(id:)
      Play.find(id)
    end
  end
end
