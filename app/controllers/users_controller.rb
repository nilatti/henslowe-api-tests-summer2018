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

  def destroy
    @user.destroy
    head :no_content
  end

  private

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(
      :bio,
      :birthdate,
      :city,
      :description,
      :emergency_contact_name,
      :emergency_contact_number,
      :first_name,
      :gender,
      :email,
      :last_name,
      :middle_name,
      :phone_number,
      :preferred_name,
      :program_name,
      :state,
      :street_address,
      :timezone,
      :website,
      :zip
    )
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_User
    @user = User.find(params[:id])
  end
end
