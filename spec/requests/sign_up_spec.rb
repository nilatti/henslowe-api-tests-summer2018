require 'rails_helper'

RSpec.describe 'POST /sign_up', type: :request do
  let(:url) { '/users' }
  let(:params)  { { user: { email: 'user@example.com', password: 'password'}}}

  context 'when user is unauthenticated' do
    before { post url, params: params }

    it 'returns 200' do
      expect(response.status).to eq 200
    end

    it 'returns a new user' do
      resp = JSON.parse(response.body)
      expect(resp['email']).to match('user@example.com')
    end
  end

  context 'when user already exists' do
    before do
      create(:user, email: 'user@example.com')
      post url, params: params
    end
    # 
    # it 'returns bad request status' do
    #   puts response.body
    #   expect(response.status).to eq 400
    # end
    #
    # it 'returns validation errors' do
    #   json = ActiveSupport::JSON.decode(response.body)
    #   expect(json['errors'].first['title']).to eq('Bad Request')
    # end

    it 'does not create that user' do
      expect(User.all.size).to eq(1)
    end
  end
end
