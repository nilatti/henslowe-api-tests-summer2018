require 'rails_helper'

RSpec.describe StageExit, type: :model do
  it "has a valid factory" do
    expect(build(:stage_exit)).to be_valid
  end

  let(:stage_exit) { build(:stage_exit) }
  describe "ActiveRecord associations" do
    it { expect(stage_exit).to belong_to(:production) }
    it { expect(stage_exit).to have_many(:entrance_exits) }
  end
  it { expect(stage_exit).to validate_presence_of(:name)}
  it "orders by name" do
    stage_exit1 = create(:stage_exit, name: "Down Left")
    stage_exit3 = create(:stage_exit, name: "Up Right")
    stage_exit2 = create(:stage_exit, name: "Up Center")
    expect(StageExit.all.last).to eq(stage_exit3)
  end
end
