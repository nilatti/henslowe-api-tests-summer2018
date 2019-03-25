class TheatersController < ApiController
  before_action :set_theater, only: %i[show update destroy]

  # GET /theaters
  def index
    @theaters = Theater.all

    json_response(@theaters)
  end

  # GET /theaters/1
  def show
    # @theater.as_json(include: [:plays])
    json_response(@theater) # how to include plays?
    # render json: @theater.to_json(include: :plays), location: @theater
  end

  # POST /theaters
  def create
    @theater = Theater.create!(theater_params)
    json_response(@theater, :created)
  end

  # PATCH/PUT /theaters/1
  def update
    @theater.update(theater_params)
    head :no_content
  end

  # DELETE /theaters/1
  def destroy
    @theater.destroy
    head :no_content
  end

  def theater_names
    @theaters = Theater.all
    render json: @theaters.to_json(only: %i[id name])
  end

  private

  # Only allow a trusted parameter "white list" through.
  def theater_params
    params.permit(:calendar_url, :city, :mission_statement, :name, :phone_number, :state, :street_address, :website, :zip)
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_theater
    @theater = Theater.find(params[:id])
  end
end
