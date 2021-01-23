require 'rails_helper'

RSpec.describe PlaysController, type: :controller do
    login_user
    
    let(:valid_attributes) { {title: "THIS IS A FAKE TITLE", author: build(:author)} }

    let(:valid_session) { {} }

    describe "GET #index" do
        it "returns a success response" do
            Play.create! valid_attributes
            get :index, params: {}, session: valid_session
            expect(response).to be_successful # be_successful expects a HTTP Status code of 200
            # expect(response).to have_http_status(302) # Expects a HTTP Status code of 302
        end
    end
end
