class SoundCuesController < ApiController
  before_action :set_sound_cue, only: [:show, :update, :destroy]

  # GET /sound_cues
  # GET /sound_cues.json
  def index
    @sound_cues = SoundCue.all
  end

  # GET /sound_cues/1
  # GET /sound_cues/1.json
  def show
  end

  # POST /sound_cues
  # POST /sound_cues.json
  def create
    @sound_cue = SoundCue.new(sound_cue_params)

    if @sound_cue.save
      render :show, status: :created, location: @sound_cue
    else
      render json: @sound_cue.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /sound_cues/1
  # PATCH/PUT /sound_cues/1.json
  def update
    if @sound_cue.update(sound_cue_params)
      render :show, status: :ok, location: @sound_cue
    else
      render json: @sound_cue.errors, status: :unprocessable_entity
    end
  end

  # DELETE /sound_cues/1
  # DELETE /sound_cues/1.json
  def destroy
    @sound_cue.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sound_cue
      @sound_cue = SoundCue.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sound_cue_params
      params.require(:sound_cue).permit(:xml_id, :line_number, :type, :french_scene_id, :notes)
    end
end
