require 'rails_helper'

RSpec.describe "SoundCues", type: :request do
  describe "GET /sound_cues" do
    it "works! (now write some real specs)" do
      get sound_cues_path
      expect(response).to have_http_status(200)
    end
  end
end
