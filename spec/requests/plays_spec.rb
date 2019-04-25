# spec/requests/plays_spec.rb
require 'rails_helper'

RSpec.describe 'Plays API' do
  # Initialize the test data
  let!(:author) { create(:author) }
  let!(:plays) { create_list(:play, 5, author_id: author.id) }
  let(:author_id) { author.id }
  let(:id) { plays.first.id }

  # Test suite for GET /authors/:author_id/plays
  describe 'GET api/authors/:author_id/plays' do
    before { get "/api/authors/#{author_id}/plays" }

    context 'when author exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all author plays' do
        expect(json.size).to eq(8)
      end
    end

    context 'when author does not exist' do
      let(:author_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Author/)
      end
    end
  end

  # Test suite for GET /authors/:author_id/plays/:id
  describe 'GET /authors/:author_id/plays/:id' do
    before { get "/api/authors/#{author_id}/plays/#{id}" }

    context 'when author play exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the play' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when author play does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Play/)
      end
    end
  end

  # Test suite for PUT /authors/:author_id/plays
  describe 'POST /authors/:author_id/plays' do
    let(:valid_attributes) { { play: { title: 'Give Us Good' } } }

    context 'when request attributes are valid' do
      before { post "/api/authors/#{author_id}/plays", params: valid_attributes }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/api/authors/#{author_id}/plays", params: { play: { genre: 'failure' } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Title can't be blank/)
      end
    end
  end

  # Test suite for PUT /authors/:author_id/plays/:id
  describe 'PUT /api/authors/:author_id/plays/:id' do
    let(:valid_attributes) { { play: { title: 'The Magic Flute' } } }

    before { put "/api/authors/#{author_id}/plays/#{id}", params: valid_attributes }

    context 'when play exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'updates the play' do
        updated_play = Play.find(id)
        expect(updated_play.title).to match(/The Magic Flute/)
      end
    end

    context 'when the play does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Play/)
      end
    end
  end

  # Test suite for DELETE /authors/:id
  describe 'DELETE /authors/:id' do
    before { delete "/api/authors/#{author_id}/plays/#{id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
