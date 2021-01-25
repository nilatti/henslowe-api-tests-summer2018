module ApiHelper
  def authenticated_header(user)
    headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
    # This will add a valid token for `user` in the `Authorization` header
    return Devise::JWT::TestHelpers.auth_headers(headers, user)
  end
end
