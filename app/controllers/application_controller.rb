class ApplicationController < ActionController::Base
  # protect_from_forgery unless: -> { request.format.json? }
  include ActionController::Cookies
  skip_forgery_protection
  # before_action :configure_permitted_parameters, if: :devise_controller?
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [
      :birthdate,
      :bio,
      :city,
      :description,
      :email,
      :emergency_contact_name,
      :emergency_contact_number,
      :first_name,
      :gender,
      :last_name,
      :middle_name,
      :password,
      :password_confirmation,
      :phone_number,
      :state,
      :street_address,
      :timezone,
      :username,
      :website,
      :zip,
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

  def authenticate_cookie
    puts "AUTH COOKIE CALLED 56"
    token = cookies.signed[:jwt]
    decoded_token = CoreModules::JsonWebToken.decode(token)
    if decoded_token
      user = User.find_by(id: decoded_token["user_id"])
    end
    if user then return true else render json: {status: 'unauthorized', code: 401} end
  end


  def encode_token(payload)
    JWT.encode(payload, ENV['DEVISE_JWT_SECRET_KEY'])
  end

  def auth_header
    if request.headers['Authorization'].length > 0
      return request.headers['Authorization']
    end
  end

  def current_user
    puts "current user called 77"
    puts cookies.signed[:jwt]
    puts cookies[:jwt]
    token = cookies.signed[:jwt]
    decoded_token = CoreModules::JsonWebToken.decode(token)
    if decoded_token
      user = User.find_by(id: decoded_token["user_id"])
    end
    if user then return user else return false end
  end

  def decode_user(token)
    if token
      Warden::JWTAuth::UserDecoder.new.call(token, :user, nil)
    end
  end

  def render_resource(resource)
    if resource.errors.empty?
      render json: resource
    else
      validation_error(resource)
    end
  end

  def validation_error(resource)
    render json: {
      errors: [
        {
          status: '400',
          title: 'Bad Request',
          detail: resource.errors,
          code: '100'
        }
      ]
    }, status: :bad_request
  end
end
