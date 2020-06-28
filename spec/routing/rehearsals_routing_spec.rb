require "rails_helper"

RSpec.describe RehearsalsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/rehearsals").to route_to("rehearsals#index")
    end

    it "routes to #show" do
      expect(:get => "/rehearsals/1").to route_to("rehearsals#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/rehearsals").to route_to("rehearsals#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/rehearsals/1").to route_to("rehearsals#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/rehearsals/1").to route_to("rehearsals#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/rehearsals/1").to route_to("rehearsals#destroy", :id => "1")
    end
  end
end
