require 'rails_helper'

RSpec.describe "EntranceExits", type: :request do
  describe "GET /entrance_exits" do
    it "works! (now write some real specs)" do
      get entrance_exits_path
      expect(response).to have_http_status(200)
    end
  end
end
