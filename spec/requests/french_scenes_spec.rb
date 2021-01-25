# spec/requests/plays_spec.rb
require 'rails_helper'

RSpec.describe 'Scenes API' do
  # Initialize the test data
  include ApiHelper
  let!(:user) { create(:user)}
  let!(:author) { create(:author) }
  let!(:play) { create(:play, author_id: author.id) }
  let!(:scene_id) { play.acts.first.scenes.first.id }
  let!(:id) { play.acts.first.scenes.first.french_scenes.first.id }
  let!(:french_scene) { play.acts.first.scenes.first.french_scenes.first }
  let!(:character) {play.characters.first}
  let!(:on_stage) { create(:on_stage, french_scene: french_scene, character_id: character.id)}
  # Test suite for GET /scenes/:scene_id/french_scenes
  describe 'GET api/scenes/:scene_id/french_scenes' do
    before {
      get "/api/scenes/#{scene_id}/french_scenes", params: {scene_id: scene_id}, headers: authenticated_header(user), as: :json
    }

    context 'when scene exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all french_scenes' do
        expect(json.size).to eq(3)
      end
    end
  end

  # Test suite for GET /scenes/:scene_id/french_scenes/:id
  describe 'GET /scenes/:scene_id/french_scenes/:id' do
    before {
      get "/api/scenes/#{scene_id}/french_scenes/#{id}", headers: authenticated_header(user), as: :json
    }

    context 'when french_scene exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the french scene' do
        expect(json['id']).to eq(id)
      end

      it 'returns characters' do
        expect(json['characters'].size).to eq(1)
      end

      it 'returns on_stages' do
        expect(json['on_stages'].size).to eq(1)
      end
    end

    context 'when french scene does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find FrenchScene/)
      end
    end
  end

  # Test suite for POST /scenes/:scene_id/french_scenes
  describe 'POST /scenes/:scene_id/french_scenes' do
    let(:valid_attributes) { { french_scene: { number: 1, scene_id: scene_id } } }

    context 'when request attributes are valid' do
      before { post "/api/scenes/#{scene_id}/french_scenes", params: valid_attributes, headers: authenticated_header(user), as: :json}

      it 'returns status code 201' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when an invalid request' do
      before { post "/api/scenes/#{scene_id}/french_scenes", params: { french_scene: { summary: 'Baby', scene_id: scene_id } }, headers: authenticated_header(user), as: :json }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expected_response = "{\"number\":[\"can't be blank\"]}"
        expect(response.body).to match(expected_response)
      end
    end
  end

  # Test suite for PUT /french_scenes/:id
  describe 'PUT /api/french_scenes/:id' do
    let(:valid_attributes) { { french_scene: { number: 'a' } } }

    before { put "/api/french_scenes/#{id}", params: valid_attributes, headers: authenticated_header(user), as: :json }

    context 'when french_scene exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'updates the french scene' do
        updated_french_scene = FrenchScene.find(id)
        expect(updated_french_scene.number).to match('a')
      end
    end

    context 'when the french scene does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find FrenchScene/)
      end
    end
  end

  # Test suite for DELETE /french_scenes/:id
  describe 'DELETE /french_scenes/:id' do
    before {
      delete "/api/french_scenes/#{id}", headers: authenticated_header(user), as: :json
    }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
