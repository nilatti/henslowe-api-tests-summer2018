class ApplicationController < ActionController::Base
  # protect_from_forgery unless: -> { request.format.json? }
  skip_forgery_protection
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [
      :username,
      :email,
      :password,
      :password_confirmation
    ])
    devise_parameter_sanitizer.permit(:account_update, keys: [
      :username,
      :email,
      :first_name,
      :middle_name,
      :last_name,
      :phone_number,
      :birthdate,
      :timezone,
      :gender,
      :bio,
      :description,
      :street_address,
      :city,
      :state,
      :zip,
      :website,
      :emergency_contact_name,
      :emergency_contact_number,
      :password,
      :password_confirmation
    ])
  end
end
