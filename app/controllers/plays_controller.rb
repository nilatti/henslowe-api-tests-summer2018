class PlaysController < ApiController
  before_action :set_author
  before_action :set_play, only: %i[show update destroy]
  # GET /plays
  def index
    if @author
      json_response(@author.plays)
    else
      json_response(Play.all)
    end
  end

  # GET /plays/1
  def show
    json_response(@play.as_json(include: %i[author acts characters]))
  end

  # POST /plays
  def create
    @author.plays.create!(play_params)
    json_response(@author, :created)
  end

  # PATCH/PUT /plays/1
  def update
    @play.update(play_params)
    json_response(@play.as_json(include: %i[author acts characters]))
  end

  # DELETE /plays/1
  def destroy
    @play.destroy
    head :no_content
  end

  def play_titles
    @plays = Play.all
    render json: @plays.to_json(only: %i[id title])
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_author
    @author = Author.find(params[:author_id]) if params[:author_id]
  end

  def set_play
    if @author
      @play = @author.plays.find_by!(id: params[:id])
    else
      @play = Play.find(params[:id])
    end

  end

  # Only allow a trusted parameter "white list" through.
  def play_params
    params.require(:play).permit(:title, :date, :genre)
  end
end
