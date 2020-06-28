require "rails_helper"

RSpec.describe CharacterGroupsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/character_groups").to route_to("character_groups#index")
    end

    it "routes to #show" do
      expect(:get => "/character_groups/1").to route_to("character_groups#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/character_groups").to route_to("character_groups#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/character_groups/1").to route_to("character_groups#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/character_groups/1").to route_to("character_groups#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/character_groups/1").to route_to("character_groups#destroy", :id => "1")
    end
  end
end
