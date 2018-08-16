class ActsController < ApplicationController
  before_action :set_act, only: [:show, :update, :destroy]
  before_action :set_play

  # GET /acts
  def index
    @acts = Act.where(play_id: @play.id)

    render json: @acts.to_json
  end

  # GET /acts/1
  def show
    render json: @act
  end

  # POST /acts
  def create
    @act = Act.new(act_params)

    if @act.save
      render json: @act, status: :created, location: @act
    else
      render json: @act.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /acts/1
  def update
    if @act.update(act_params)
      render json: @act
    else
      render json: @act.errors, status: :unprocessable_entity
    end
  end

  # DELETE /acts/1
  def destroy
    @act.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_act
      @act = Act.find(params[:id])
    end

    def set_play
      if params[:play_id]
        @play = Play.find(params[:play_id])
      else
        @play = Play.find(@act.play.id)
      end
    end
    # Only allow a trusted parameter "white list" through.
    def act_params
      params.require(:act).permit(:act_number, :play_id, :summary, :start_page, :end_page)
    end
end
