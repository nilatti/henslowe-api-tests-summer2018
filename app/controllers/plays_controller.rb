class PlaysController < ApiController
  before_action :set_author, only: %i[index, create]
  before_action :set_play, only: %i[show update destroy]
  # GET /plays
  def index
    if @author
      json_response(@author.plays.as_json(only: %i[id title]))
    else
      json_response(Play.all.as_json(only: %i[id title]))
    end
  end

  # GET /plays/1
  def show
    render json: @play.as_json(include:
      [
        :author,
        :characters,
        acts: {
          include: {
            scenes: {
              include: {
                french_scenes: {
                  include: [
                    :characters,
                    on_stages: {
                      include: :character
                    }
                  ]
                }
              }
            }
          }
        }
        ]
      )
    # json_response(@play.as_json(include: [:acts, :author, :characters]))
  end

  # POST /plays
  def create
    @play = Play.new(play_params)

    if @play.save
      render json: @play, status: :created, location: @author
    else
      render json: @play.errors, status: :unprocessable_entity
    end
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
    render json: @plays.as_json(only: %i[id title])
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_author
    if params[:play][:author_id]
      @author = Author.find(params[:play][:author_id])
    elsif params[:author_id]
      @author = Author.find(params[:author_id])
    end
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
    params.require(:play).permit(:author_id, :title, :date, :genre)
  end
end
