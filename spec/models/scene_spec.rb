require 'rails_helper'

RSpec.describe Scene, type: :model do
  it "has a valid factory" do
    expect(build(:scene)).to be_valid
  end

  let(:scene) { build(:scene) }

  describe "ActiveRecord associations" do
    it { expect(scene).to belong_to(:act) }
    it { expect(scene).to have_many(:french_scenes).dependent(:destroy) }
    it { expect(scene).to have_many(:lines).through(:french_scenes) }
    it { expect(scene).to have_and_belong_to_many(:rehearsals) }
  end

  describe "ActiveModel validations" do
    it { expect(scene).to validate_presence_of(:number)}
  end

  it "it default scope orders by number" do
    scene1 = create(:scene, number: 2)
    scene2 = create(:scene, number: 1)
    expect(Scene.all.first.number).to eq(1)
  end

   it "has a pretty name" do
     act = build(:act)
     scene = build(:scene, act: act)
     expect(scene.pretty_name).to eq("#{act.number}.#{scene.number}")
   end
   it "sorts in play order" do
     play = build(:play)
     act1 = build(:act, number: 1, play: play)
     act2 = build(:act, number: 2, play: play)
     scene3 = build(:scene, number: 1, act: act2)
     scene2 = build(:scene, number: 2, act: act1)
     scene1 = build(:scene, number: 1, act: act1)
     scenes = [scene1, scene2, scene3]
     expect(Scene.play_order(scenes).first).to be(scene1)
     expect(Scene.play_order(scenes).last).to be(scene3)
   end
end
