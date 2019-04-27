require "rails_helper"

RSpec.describe FrenchScenesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/french_scenes").to route_to("french_scenes#index")
    end

    it "routes to #show" do
      expect(:get => "/french_scenes/1").to route_to("french_scenes#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/french_scenes").to route_to("french_scenes#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/french_scenes/1").to route_to("french_scenes#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/french_scenes/1").to route_to("french_scenes#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/french_scenes/1").to route_to("french_scenes#destroy", :id => "1")
    end
  end
end
