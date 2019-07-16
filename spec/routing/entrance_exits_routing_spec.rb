require "rails_helper"

RSpec.describe EntranceExitsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/entrance_exits").to route_to("entrance_exits#index")
    end

    it "routes to #show" do
      expect(:get => "/entrance_exits/1").to route_to("entrance_exits#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/entrance_exits").to route_to("entrance_exits#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/entrance_exits/1").to route_to("entrance_exits#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/entrance_exits/1").to route_to("entrance_exits#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/entrance_exits/1").to route_to("entrance_exits#destroy", :id => "1")
    end
  end
end
