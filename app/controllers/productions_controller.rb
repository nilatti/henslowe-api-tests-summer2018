class ProductionsController < ApiController
  before_action :set_production, only: [:show, :update, :destroy]

  # GET /productions
  def index
    @productions = Production.all

    json_response(@productions.as_json(include: [:play, :theater]))
    # render json: @productions
  end

  # GET /productions/1
  def show
    json_response(@production.as_json(include:
        [
          :theater,
          play: {
            include: :characters
          },
          jobs: {
            include: [
              :character,
              :specialization,
            ]
          }
        ]
      )
    )
  end

  # POST /productions
  def create
    @production = Production.new(production_params)

    if @production.save
      json_response(@production.as_json(include: [:theater]), :created)
      PlayCopyWorker.perform_async(production_params['play_id'], @production.id)
    else
      render json: @production.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /productions/1
  def update
    if @production.update(production_params)
      json_response(@production.as_json(include: [:play, :theater]))
    else
      render json: @production.errors, status: :unprocessable_entity
    end
  end

  # DELETE /productions/1
  def destroy
    @production.destroy
  end

  def production_names
    @productions = Production.all
    render json: @productions.as_json(only: %i[id name], include: [:theater, :play])
  end

  def get_productions_for_theater
    @productions = Production.where(theater: params[:theater])
    json_response(@productions.as_json(include: [:play, :theater]))
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_production
      @production = Production.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def production_params
      params.require(:production).permit(
        :end_date,
        :id,
        :play_id,
        :theater_id,
        :start_date
      )
    end
end
