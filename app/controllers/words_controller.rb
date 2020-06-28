class WordsController < ApiController
  before_action :set_word, only: [:show, :update, :destroy]

  # GET /words
  # GET /words.json
  def index
    @words = Word.all
  end

  # GET /words/1
  # GET /words/1.json
  def show
  end

  # POST /words
  # POST /words.json
  def create
    @word = Word.new(word_params)

    if @word.save
      render :show, status: :created, location: @word
    else
      render json: @word.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /words/1
  # PATCH/PUT /words/1.json
  def update
    if @word.update(word_params)
      render :show, status: :ok, location: @word
    else
      render json: @word.errors, status: :unprocessable_entity
    end
  end

  # DELETE /words/1
  # DELETE /words/1.json
  def destroy
    @word.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_word
      @word = Word.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def word_params
      params.require(:word).permit(:type, :content, :xml_id, :line_id, :line_number, :play_id)
    end
end
