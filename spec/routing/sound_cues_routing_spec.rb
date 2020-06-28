require "rails_helper"

RSpec.describe SoundCuesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/sound_cues").to route_to("sound_cues#index")
    end

    it "routes to #show" do
      expect(:get => "/sound_cues/1").to route_to("sound_cues#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/sound_cues").to route_to("sound_cues#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/sound_cues/1").to route_to("sound_cues#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/sound_cues/1").to route_to("sound_cues#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/sound_cues/1").to route_to("sound_cues#destroy", :id => "1")
    end
  end
end
