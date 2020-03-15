class ConflictsController < ApiController
  before_action :set_conflict, only: [:show, :update, :destroy]

  # GET /conflicts
  # GET /conflicts.json
  def index
    if (params[:user_id])
      @conflicts = Conflict.where(user_id == params[:user_id])
    elsif (params[:space_id])
      @conflicts = Conflict.where(space_id == params[:space_id])
    end

    render json: @conflicts.as_json
  end

  # GET /conflicts/1
  # GET /conflicts/1.json
  def show
    render json: @conflict.as_json
  end

  # POST /conflicts
  # POST /conflicts.json
  def create
    @conflict = Conflict.new(conflict_params)

    if @conflict.save
      render json: @conflict, status: :created, location: @user
    else
      render json: @conflict.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /conflicts/1
  # PATCH/PUT /conflicts/1.json
  def update
    if @conflict.update(conflict_params)
      render json: @conflict
    else
      render json: @conflict.errors, status: :unprocessable_entity
    end
  end

  # DELETE /conflicts/1
  # DELETE /conflicts/1.json
  def destroy
    @conflict.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_conflict
      @conflict = Conflict.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def conflict_params
      params.require(:conflict).permit(:user_id, :start_time, :end_time, :category, :space_id)
    end
end
