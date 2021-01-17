require 'rails_helper'

RSpec.describe EntranceExit, type: :model do
  it "has a valid factory" do
    expect(build(:entrance_exit, :with_character)).to be_valid
  end
  let(:entrance_exit) { build(:entrance_exit, :with_character) }
  describe "ActiveModel validations" do
    it { expect(entrance_exit).to belong_to(:french_scene) }
    it { expect(entrance_exit).to belong_to(:stage_exit) }
    it { expect(entrance_exit).to have_and_belong_to_many(:characters) }
    it { expect(entrance_exit).to have_and_belong_to_many(:character_groups) }
    it "checks for character group or character" do
      entrance_exit_with_none = build(:entrance_exit)
      entrance_exit_with_none.valid?
      expect(entrance_exit_with_none.errors[:entrance_exit]).to include("Must have at least one character or character group")

      conflict_with_none = build(:conflict, :both)
      conflict_with_none.valid?
      expect(conflict_with_none.errors[:conflict]).to include("You can only have a space OR a user, not both.")

      conflict_with_none = build(:conflict, :space)
      conflict_with_none.valid?
      expect(conflict_with_none.errors[:conflict].length).to eq(0)

      conflict_with_none = build(:conflict)
      conflict_with_none.valid?
      expect(conflict_with_none.errors[:conflict].length).to eq(0)
    end
  end
end
