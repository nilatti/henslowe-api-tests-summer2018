class FrenchScenesController < ApiController
  before_action :set_french_scene, only: [:show, :update, :destroy]
  before_action :set_scene

  # GET /scenes
  def index
    @french_scenes = @scene.french_scenes

    render json: @french_scenes
  end

  # GET /scenes/1
  def show
    render json: @french_scene
  end

  # POST /scenes
  def create
    @french_scene = FrenchScene.new(french_scene_params)

    if @french_scene.save
      render json: @french_scene, status: :created, location: @french_scene
    else
      render json: @french_scene.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /scenes/1
  def update
    if @french_scene.update(french_scene_params)
      render json: @french_scene
    else
      render json: @french_scene.errors, status: :unprocessable_entity
    end
  end

  # DELETE /scenes/1
  def destroy
    @french_scene.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_scene
      if params[:scene_id]
        @scene = Scene.find(params[:scene_id])
      end
    end

    def set_french_scene
      @french_scene = FrenchScene.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def french_scene_params
      params.require(:french_scene).permit(:end_page, :number, :scene_id, :start_page, :summary)
    end
end
