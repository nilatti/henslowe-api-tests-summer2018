require 'rails_helper'

RSpec.describe "Scenes", type: :request do
  describe "GET /scenes" do
    it "works! (now write some real specs)" do
      get scenes_path
      expect(response).to have_http_status(200)
    end
  end
end
