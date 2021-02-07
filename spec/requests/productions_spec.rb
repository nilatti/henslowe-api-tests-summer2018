# spec/requests/productions_spec.rb
require 'rails_helper'

RSpec.describe 'Productions API' do
  # Initialize the test data
  include ApiHelper
  let!(:user) { create(:user)}
  let!(:productions) { create_list(:production, 5) }
  let!(:theater) {create(:theater)}
  let(:id) { productions.first.id }

  # Test suite for GET /productions
  describe 'GET api/productions' do
    before {
      get "/api/productions", headers: authenticated_header(user), as: :json
    }

    context 'when productions exist' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all productions' do
        expect(json.size).to eq(5)
      end
    end
  end

  # Test suite for GET /productions/:id
  describe 'GET /productions/:id' do
    before { get "/api/productions/#{id}", headers: authenticated_header(user), as: :json }

    context 'when production exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the production' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when production does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Production/)
      end
    end
  end

  # Test suite for PUT /productions
  describe 'POST /productions' do
    let(:valid_attributes) { { production: attributes_for(:production, theater_id: theater.id) } }

    context 'when request attributes are valid' do
      before { post "/api/productions", params: valid_attributes, headers: authenticated_header(user), as: :json }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/api/productions", params: { production: { start_date: Time.now, end_date: Time.now - 3.days } }, headers: authenticated_header(user), as: :json }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expected_response = "{\"theater\":[\"must exist\"],\"end_date\":[\"can't be before start date\"]}"
        expect(response.body).to match(expected_response)
      end
    end
  end

  # Test suite for PUT /productions/:id
  describe 'PUT /api/productions/:id' do
    let(:valid_attributes) { { production: attributes_for(:production, start_date: Time.now)  } }

    before { put "/api/productions/#{id}", params: valid_attributes, headers: authenticated_header(user), as: :json }

    context 'when production exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the production does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Production/)
      end
    end
  end

  # Test suite for DELETE /productions/:id
  describe 'DELETE /productions/:id' do
    before { delete "/api/productions/#{id}", headers: authenticated_header(user), as: :json }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
