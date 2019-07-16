require 'rails_helper'

RSpec.describe "StageExits", type: :request do
  describe "GET /stage_exits" do
    it "works! (now write some real specs)" do
      get stage_exits_path
      expect(response).to have_http_status(200)
    end
  end
end
