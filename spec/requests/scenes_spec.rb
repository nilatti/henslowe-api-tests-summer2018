# spec/requests/plays_spec.rb
require 'rails_helper'

RSpec.describe 'Scenes API' do
  # Initialize the test data
  let!(:author) { create(:author) }
  let!(:play) { create(:play, author_id: author.id) }
  let!(:act_id) { play.acts.first.id }
  let!(:id) { play.acts.first.scenes.first.id }

  # Test suite for GET /acts/:act_id/scenes
  describe 'GET api/acts/:act_id/scenes' do
    before {
      get "/api/acts/#{act_id}/scenes", params: {act_id: act_id}
    }

    context 'when scene exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all scenes' do
        expect(json.size).to eq(3)
      end
    end
  end

  # Test suite for GET /acts/:act_id/scenes/:id
  describe 'GET /acts/:act_id/scenes/:id' do
    before {
      get "/api/acts/#{act_id}/scenes/#{id}"
    }

    context 'when scene exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the scene' do
        expect(json['id']).to eq(id)
      end

      it 'has french scenes' do
        expect(json['french_scenes'].size).to eq(3)
      end
    end

    context 'when scene does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Scene/)
      end
    end
  end

  # Test suite for POST /acts/:act_id/scenes
  describe 'POST /acts/:act_id/scenes' do
    let(:valid_attributes) { { scene: { number: 1, act_id: act_id } } }

    context 'when request attributes are valid' do
      before { post "/api/acts/#{act_id}/scenes", params: valid_attributes }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/api/acts/#{act_id}/scenes", params: { scene: { summary: 'Baby', act_id: act_id } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expected_response = "{\"number\":[\"can't be blank\"]}"
        expect(response.body).to match(expected_response)
      end
    end
  end

  # Test suite for PUT /scenes/:id
  describe 'PUT /api/scenes/:id' do
    let(:valid_attributes) { { scene: { number: 2 } } }

    before { put "/api/scenes/#{id}", params: valid_attributes }

    context 'when scene exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'updates the scene' do
        updated_scene = Scene.find(id)
        expect(updated_scene.number).to match(2)
      end
    end

    context 'when the scene does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Scene/)
      end
    end
  end

  # Test suite for DELETE /scenes/:id
  describe 'DELETE /scenes/:id' do
    before {
      delete "/api/scenes/#{id}"
    }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
