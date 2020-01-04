class StageDirectionsController < ApplicationController
  before_action :set_stage_direction, only: [:show, :update, :destroy]

  # GET /stage_directions
  # GET /stage_directions.json
  def index
    @stage_directions = StageDirection.all
  end

  # GET /stage_directions/1
  # GET /stage_directions/1.json
  def show
  end

  # POST /stage_directions
  # POST /stage_directions.json
  def create
    @stage_direction = StageDirection.new(stage_direction_params)

    if @stage_direction.save
      render :show, status: :created, location: @stage_direction
    else
      render json: @stage_direction.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /stage_directions/1
  # PATCH/PUT /stage_directions/1.json
  def update
    if @stage_direction.update(stage_direction_params)
      render :show, status: :ok, location: @stage_direction
    else
      render json: @stage_direction.errors, status: :unprocessable_entity
    end
  end

  # DELETE /stage_directions/1
  # DELETE /stage_directions/1.json
  def destroy
    @stage_direction.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stage_direction
      @stage_direction = StageDirection.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def stage_direction_params
      params.require(:stage_direction).permit(:french_scene_id, :number, :kind, :xml_id, :content)
    end
end
