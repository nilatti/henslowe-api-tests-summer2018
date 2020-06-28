require 'rails_helper'

RSpec.describe 'jobs API', type: :request do
  # initialize test data
  let!(:jobs) { create_list(:job, 10) }
  let(:job_id) { jobs.first.id }

  # Test suite for GET /jobs
  describe 'GET /jobs' do
    # make HTTP get request before each example
    before { get '/api/jobs' }

    it 'returns jobs' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /jobs/:id
  describe 'GET api/jobs/:id' do
    before { get "/api/jobs/#{job_id}" }
    context 'when the record exists' do
      it 'returns the job' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(job_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:job_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Job/)
      end
    end
  end

  # Test suite for POST /jobs
  describe 'POST /jobs' do
    # valid payload

    context 'when the request is valid' do

      it 'creates a job' do
        test_job = build(:job)
        valid_attributes = {
          job: {
            end_date: test_job.end_date,
            specialization_id: test_job.specialization.id,
            start_date: test_job.start_date,
            user_id: test_job.user.id,
          } }
        post '/api/jobs', params: valid_attributes
        expect(json['user_id']).to eq(test_job.user.id)
      end

      it 'creates a job, without an end date' do
        test_job = build(:job)
        valid_attributes = { job:
          {
            user_id: test_job.user.id,
            specialization_id: test_job.specialization.id,
            start_date: test_job.start_date
          }
        }
        post '/api/jobs', params: valid_attributes
        expect(response).to have_http_status(201)
      end

      it 'creates a job, without any dates' do
        test_job = build(:job)
        valid_attributes = { job:
          {
            user_id: test_job.user.id,
            specialization_id: test_job.specialization.id,
          }
        }
        post '/api/jobs', params: valid_attributes
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/jobs', params: { job: { end_date: '2001-09-01', start_date: '2002-11-01' } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/can\'t be before start date/)
      end
    end
  end

  # Test suite for PUT /jobs/:id
  describe 'PUT /api/jobs/:id' do

    context 'when the record exists' do

      it 'returns status code 200' do
        test_job = build(:job)
        valid_attributes = {
          job: {
            specialization_id: test_job.specialization.id,
            start_date: test_job.start_date,
            theater_id: test_job.theater.id,
            } }
          put "/api/jobs/#{job_id}", params: valid_attributes
        expect(response).to have_http_status(200)
      end
    end
  end

  # Test suite for DELETE /jobs/:id
  describe 'DELETE /jobs/:id' do
    before { delete "/api/jobs/#{job_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
