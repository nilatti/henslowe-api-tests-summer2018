require 'rails_helper'

RSpec.describe EntranceExit, type: :model do
  it "has a valid factory" do
    expect(build(:entrance_exit)).to be_valid
  end
  let(:entrance_exit) { build(:entrance_exit) }
  describe "ActiveModel validations" do
    it { expect(entrance_exit).to belong_to(:french_scene) }
    it { expect(entrance_exit).to belong_to(:user).optional }
    it { expect(entrance_exit).to belong_to(:stage_exit) }
    it { expect(entrance_exit).to have_and_belong_to_many(:characters) }
    it { expect(entrance_exit).to have_and_belong_to_many(:character_groups) }
  end
end
