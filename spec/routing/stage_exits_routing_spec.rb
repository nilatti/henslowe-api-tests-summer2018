require "rails_helper"

RSpec.describe StageExitsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/stage_exits").to route_to("stage_exits#index")
    end

    it "routes to #show" do
      expect(:get => "/stage_exits/1").to route_to("stage_exits#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/stage_exits").to route_to("stage_exits#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/stage_exits/1").to route_to("stage_exits#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/stage_exits/1").to route_to("stage_exits#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/stage_exits/1").to route_to("stage_exits#destroy", :id => "1")
    end
  end
end
