require 'rails_helper'

RSpec.describe StageDirection, type: :model do
  it "has a valid factory" do
    expect(build(:stage_direction)).to be_valid
  end

  let(:stage_direction) { build(:stage_direction) }
  describe "ActiveRecord associations" do
    it { expect(stage_direction).to belong_to(:french_scene) }
    it { expect(stage_direction).to have_and_belong_to_many(:characters) }
    it { expect(stage_direction).to have_and_belong_to_many(:character_groups) }
  end

end
