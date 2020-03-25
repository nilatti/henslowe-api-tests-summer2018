class RehearsalsController < ApiController
  before_action :set_rehearsal, only: [:show, :update, :destroy]
  before_action :set_production
  # GET /acts
  def index
    @rehearsals = Rehearsal.where(production_id: @production.id)

    render json: @rehearsals.as_json
  end

  # GET /acts/1
  def show
    render json: @rehearsal.as_json
  end

  # POST /acts
  def create
    @rehearsal = Rehearsal.new(rehearsal_params)

    if @rehearsal.save
      render json: @rehearsal, status: :created, location: @production
    else
      render json: @rehearsal.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /acts/1
  def update
    @rehearsal.update(rehearsal_params)
    render json: @rehearsal.as_json(include: [:acts, :french_scenes, :scenes])
    # else
    #   render json: @rehearsal.errors, status: :unprocessable_entity
    # end
  end

  # DELETE /acts/1
  def destroy
    @rehearsal.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_production
      if params[:production_id]
        @production = Production.find(params[:production_id])
      end
    end

    def set_rehearsal
      @rehearsal = Rehearsal.includes(:acts, :french_scenes, :scenes).find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def rehearsal_params
      params.require(:rehearsal).permit(
        :end_time,
        :notes,
        :production_id,
        :space_id,
        :start_time,
        :title,
        act_ids: [],
        french_scene_ids: [],
        scene_ids: []
      )
    end
end
