class RegistrationsController < Devise::RegistrationsController
  # before_action :authenticate_user!, :redirect_unless_admin, only: [:new, :create]
  # skip_before_action :require_no_authentication

  respond_to :json

  # private

  # def redirect_unless_admin
  #   head :unauthorized unless current_user.try(:admin?)
  # end

  # def sign_up(_resource_name, _resource)
  #   render json: _resource, status: 201
  # end

  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        render json: :resource
        # respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

end
