require "rails_helper"

RSpec.describe StageDirectionsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/stage_directions").to route_to("stage_directions#index")
    end

    it "routes to #show" do
      expect(:get => "/stage_directions/1").to route_to("stage_directions#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/stage_directions").to route_to("stage_directions#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/stage_directions/1").to route_to("stage_directions#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/stage_directions/1").to route_to("stage_directions#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/stage_directions/1").to route_to("stage_directions#destroy", :id => "1")
    end
  end
end
