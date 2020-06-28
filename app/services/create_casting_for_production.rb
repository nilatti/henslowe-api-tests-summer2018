class CreateCastingForProduction
  def initialize(play_id:, production_id:)
    @play = Play.find(play_id)
    @characters = @play.characters
    @production = Production.find(production_id)
    @specialization = Specialization.find_by(title: 'Actor')
  end
  def create_castings
    @characters.each do |character|
      job = Job.create!(
        character: character,
        end_date: @production.end_date,
        production: @production,
        specialization: @specialization,
        start_date: @production.start_date,
        theater: @production.theater
      )
    end
  end
end
