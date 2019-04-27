require 'rails_helper'

RSpec.describe "FrenchScenes", type: :request do
  describe "GET /french_scenes" do
    it "works! (now write some real specs)" do
      get french_scenes_path
      expect(response).to have_http_status(200)
    end
  end
end
