require 'rails_helper'

RSpec.describe "CharacterGroups", type: :request do
  describe "GET /character_groups" do
    it "works! (now write some real specs)" do
      get character_groups_path
      expect(response).to have_http_status(200)
    end
  end
end
