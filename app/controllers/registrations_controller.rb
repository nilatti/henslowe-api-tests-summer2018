class RegistrationsController < Devise::RegistrationsController
def create
    @user = User.new(user_params)
    if @user.save
      render json: @user
    else
      warden.custom_failure!
      render json: { error: 'signup error' }, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find_by_email(user_params[:email])

    if @user.update_attributes(user_params)
      render json: @user
    else
      warden.custom_failure!
      render :json=> @user.errors, :status=>422
    end
 end

  def destroy
    @user = User.find_by_email(user_params[:email])
    if @user.destroy
      render :json=> { success: 'user was successfully deleted' }, :status=>201
    else
      render :json=> { error: 'user could not be deleted' }, :status=>422
    end
  end

  private

  def user_params
     params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name, :middle_name)
  end
end
# class RegistrationsController < Devise::RegistrationsController
#   # before_action :authenticate_user!, :redirect_unless_admin, only: [:new, :create]
#   # skip_before_action :require_no_authentication
#
#   respond_to :json
#
#   # private
#
#   # def redirect_unless_admin
#   #   head :unauthorized unless current_user.try(:admin?)
#   # end
#
#   # def sign_up(_resource_name, _resource)
#   #   render json: _resource, status: 201
#   # end
#
#   def create
#     build_resource(sign_up_params)
#
#     resource.save
#     yield resource if block_given?
#     if resource.persisted?
#       if resource.active_for_authentication?
#         set_flash_message! :notice, :signed_up
#         sign_up(resource_name, resource)
#         render json: :resource
#         # respond_with resource, location: after_sign_up_path_for(resource)
#       else
#         set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
#         expire_data_after_sign_in!
#         respond_with resource, location: after_inactive_sign_up_path_for(resource)
#       end
#     else
#       clean_up_passwords resource
#       set_minimum_password_length
#       respond_with resource
#     end
#   end
#
# end
