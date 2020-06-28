class CharacterGroupsController < ApiController
  before_action :set_character_group, only: [:show, :update, :destroy]

  # GET /character_groups
  # GET /character_groups.json
  def index
    @character_groups = CharacterGroup.all
  end

  # GET /character_groups/1
  # GET /character_groups/1.json
  def show
  end

  # POST /character_groups
  # POST /character_groups.json
  def create
    @character_group = CharacterGroup.new(character_group_params)

    if @character_group.save
      render :show, status: :created, location: @character_group
    else
      render json: @character_group.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /character_groups/1
  # PATCH/PUT /character_groups/1.json
  def update
    if @character_group.update(character_group_params)
      render :show, status: :ok, location: @character_group
    else
      render json: @character_group.errors, status: :unprocessable_entity
    end
  end

  # DELETE /character_groups/1
  # DELETE /character_groups/1.json
  def destroy
    @character_group.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_character_group
      @character_group = CharacterGroup.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def character_group_params
      params.require(:character_group).permit(:name, :xml_id, :corresp, :play_id)
    end
end
