class UsersController < ApiController
  before_action :set_User, only: %i[show update destroy]

  # GET /Users
  def index
    @users = User.all

    json_response(@users)
  end

  # GET /Users/1
  def show
    json_response(@user.as_json)
  end

  def update
    @user.update(user_params)
    json_response(@user)
  end

  private

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:first_name, :email)
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_User
    @user = User.find(params[:id])
  end
end
