class GraphqlController < ApplicationController
  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately
  # protect_from_forgery with: :null_session
  def execute
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    current_user = get_logged_in_user(request)
    context = {
      current_user: current_user,
    }
    result = June20Schema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue => e
    raise e unless Rails.env.development?
    handle_error_in_development e
  end

  private

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def get_logged_in_user(request)
    puts "get logged in user called"
    puts current_user
    return current_user
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} }, status: 500
  end

  def sign_out
    user = current_user
    if user
      cookies.delete(:jwt)
      render json: {status: 'OK', code: 200}
    else
      render json: {status: 'session not found', code: 404}
    end
  end

  def sign_in
    puts "CREATE SESSION CALLED"
    email = params["email"]
    password = params["password"]
    if email && password
      login_hash = User.handle_login(email, password)
      if login_hash
        cookies.signed[:jwt] = {value:  login_hash[:token], httponly: true}
        render json: {
          user_id: login_hash[:user_id],
          name: login_hash[:name],
        }
      else
        render json: {status: 'incorrect email or password', code: 422}
      end
    else
      render json: {status: 'specify email address and password', code: 422}
    end
  end
end
