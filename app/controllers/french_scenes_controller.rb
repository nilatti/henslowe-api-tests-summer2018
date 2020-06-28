class FrenchScenesController < ApiController
  before_action :set_french_scene, only: [:show, :update, :destroy]
  before_action :set_scene

  # GET /scenes
  def index
    @french_scenes = FrenchScene.play_order(@scene.french_scenes)

    render json: @french_scenes
  end

  # GET /scenes/1
  def show
    json_response(@french_scene.as_json(
        include: [
          :characters,
          on_stages: {
            include: :character,
          },
          entrance_exits: {
            include: :characters
          },
        ]
      ))
  end

  # POST /scenes
  def create
    @french_scene = FrenchScene.new(french_scene_params)
    if @french_scene.save
      if params[:character_ids]
        build_on_stages(character_ids: params[:character_ids], french_scene: @french_scene)
      end
      json_response(@french_scene.as_json(
          include: [
            :characters,
            on_stages: {
              include: :character,
            },
            entrance_exits: {
              include: :characters
            },
          ]
        ))
    else
      render json: @french_scene.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /french_scenes/1
  def update
    if french_scene_params[:character_ids]
      build_on_stages(character_ids: french_scene_params[:character_ids], french_scene: @french_scene)
    end
    if @french_scene.update(french_scene_params)
      json_response(@french_scene.as_json(
          include: [
            :characters,
            on_stages: {
              include: :character,
            },
            entrance_exits: {
              include: :characters
            },
          ]
        ))
    else
      render json: @french_scene.errors, status: :unprocessable_entity
    end
  end

  # DELETE /scenes/1
  def destroy
    @french_scene.destroy
  end

  def french_scene_script
    @french_scene = FrenchScene.includes(:sound_cues, lines: [:character], stage_directions: [:characters, :character_groups]).find(params[:french_scene])

    render json: @french_scene.as_json(include:
      [
        :sound_cues,
        stage_directions: {
          include: [:characters, :character_groups]
        },
        lines: {
          include: [:character, :words]
        }
        ]
      )
  end

  private

    def build_on_stages(character_ids:, french_scene:)
      character_ids.each do |character_id|
        on_stage = OnStage.new(character_id: character_id, french_scene_id: french_scene.id)
        on_stage.save
      end
    end
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
      params.require(:french_scene).permit(
        :end_page,
        :id,
        :new_line_count,
        :number,
        :original_line_count,
        :scene_id,
        :start_page,
        :summary,
        character_ids: [],
        entrance_exits_attributes: [
          :french_scene_id,
          :page,
          :line,
          :order,
          :stage_exit_id,
          :category,
          :notes,
          :character_id
        ],
        on_stages_attributes: [
          :category,
          :character_id,
          :created_at,
          :description,
          :french_scene_id,
          :id,
          :nonspeaking,
          :updated_at,
          :user_id,
          :_destroy
          ]
        )
    end
end
