class EntranceExitsController < ApplicationController
  before_action :set_entrance_exit, only: [:show, :update, :destroy]

  # GET /entrance_exits
  def index
    @entrance_exits = EntranceExit.all

    render json: @entrance_exits
  end

  # GET /entrance_exits/1
  def show
    render json: @entrance_exit
  end

  # POST /entrance_exits
  def create
    @entrance_exit = EntranceExit.new(entrance_exit_params)

    if @entrance_exit.save
      render json: @entrance_exit, status: :created, location: @entrance_exit
    else
      render json: @entrance_exit.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /entrance_exits/1
  def update
    if @entrance_exit.update(entrance_exit_params)
      render json: @entrance_exit
    else
      render json: @entrance_exit.errors, status: :unprocessable_entity
    end
  end

  # DELETE /entrance_exits/1
  def destroy
    @entrance_exit.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_entrance_exit
      @entrance_exit = EntranceExit.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def entrance_exit_params
      params.require(:entrance_exit).permit(:french_scene_id, :page, :line, :order, :user_id)
    end
end
