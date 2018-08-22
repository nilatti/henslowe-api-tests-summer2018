class PlaysController < ApiController
  before_action :set_play, only: [:show, :update, :destroy]
  before_action :set_author
  # GET /plays
  def index
    if @author
      @plays = Play.where(author_id: @author.id)
    else
      @plays = Play.all
    end

    render json: @plays.to_json
  end

  # GET /plays/1
  def show
    render json: @play.to_json(include: [:author, :acts])
  end

  # POST /plays
  def create
    @play = Play.new(play_params)

    if @play.save
      render json: @play, status: :created, location: @play
    else
      render json: @play.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /plays/1
  def update
    if @play.update(play_params)
      render json: @play
    else
      render json: @play.errors, status: :unprocessable_entity
    end
  end

  # DELETE /plays/1
  def destroy
    @play.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_author
      if params[:author_id]
        @author = Author.find(params[:author_id])
      end
    end

    def set_play
      @play = Play.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def play_params
      params.require(:play).permit(:title, :author_id, :date, :genre)
    end

end
