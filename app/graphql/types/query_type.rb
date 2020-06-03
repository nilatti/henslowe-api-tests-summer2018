module Types
  class QueryType < Types::BaseObject
    field :author,
      Types::AuthorType,
      null: false,
      description: "Returns one author" do
        argument :id, ID, required: true
      end
    field :authors,
      [Types::AuthorType],
      null: false,
      description: "Returns a list of authors"
    field :job,
      Types::JobType,
      null: false,
      description: "returns one job" do
        argument :id, ID, required: true
      end
    field :jobs,
      [Types::JobType],
      null: false,
      description: "returns a list of jobs"
    field :play,
      Types::PlayType,
      null: false,
      description: "Returns one play" do
        argument :id, ID, required: true
      end
    field :plays,
      [Types::PlayType],
      null: false,
      description: "Returns a list of plays"
    field :production,
      Types::ProductionType,
      null: false,
      description: "Returns one production" do
        argument :id, ID, required: true
      end
    field :productions,
      [Types::ProductionType],
      null: false,
      description: "returns a list of productions"
    field :rehearsal,
      Types::RehearsalType,
      null: false,
      description: "Returns one rehearsal" do
        argument :id, ID, required: true
      end
    field :rehearsals,
      [Types::RehearsalType],
      null: false,
      description: "returns a list of rehearsals"
    field :space,
      Types::SpaceType,
      null: false,
      description: "Returns one space" do
        argument :id, ID, required: true
      end
    field :spaces,
      [Types::SpaceType],
      null: false,
      description: "returns a list of spaces"
    field :specialization,
      Types::SpecializationType,
      null: false,
      description: "returns one specialization" do
        argument :id, ID, required: true
      end
    field :specializations,
      [Types::SpecializationType],
      null: false,
      description: "returns a list of specializations"
    field :theater,
      Types::TheaterType,
      null: false,
      description: "returns one theater" do
        argument :id, ID, required: true
      end
    field :theaters,
      [Types::TheaterType],
      null: false,
      description: "returns a list of theaters"
    field :user,
      [Types::UserType],
      null: false,
      description: "returns one user" do
        argument :id, ID, required: true
      end
    field :users,
      [Types::UserType],
      null: false,
      description: "returns a list of users"

    def author(id:)
      Author.find(id)
    end
    def authors
      Author.all
    end
    def job(id:)
      Job.find(id)
    end
    def jobs
      Job.all
    end
    def play(id:)
      Play.find(id)
    end
    def plays
      Play.all
    end
    def production(id:)
      Production.find(id)
    end
    def productions
      Production.all
    end
    def rehearsal(id:)
      Rehearsal.find(id)
    end
    def rehearsals
      Rehearsal.all
    end
    def space(id:)
      Space.find(id)
    end
    def spaces
      Space.all
    end
    def specialization(id:)
      specialization(id)
    end
    def specializations
      Specialization.all
    end
    def theater(id:)
      theater(id)
    end
    def theaters
      Theater.all
    end
    def user(id:)
      User.find(id)
    end
    def users
      User.all
    end
  end
end
