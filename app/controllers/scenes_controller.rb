class ScenesController < ApiController
  before_action :set_scene, only: [:show, :update, :destroy]
  before_action :set_act

  # GET /scenes
  def index
    @scenes = Scene.all

    render json: @scenes
  end

  # GET /scenes/1
  def show
    json_response(@scene.as_json(include: %i[french_scenes]))
  end

  # POST /scenes
  def create
    @scene = Scene.new(scene_params)

    if @scene.save
      render json: @scene, status: :created, location: @scene
    else
      render json: @scene.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /scenes/1
  def update
    if @scene.update(scene_params)
      render json: @scene
    else
      render json: @scene.errors, status: :unprocessable_entity
    end
  end

  # DELETE /scenes/1
  def destroy
    @scene.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_act
      if params[:act_id]
        @act = Act.find(params[:id])
      end
    end

    def set_scene
      @scene = Scene.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def scene_params
      params.require(:scene).permit(:act_id, :number, :summary)
    end
end
