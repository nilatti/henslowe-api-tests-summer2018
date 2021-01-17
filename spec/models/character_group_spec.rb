require 'rails_helper'

describe CharacterGroup do

  it "has a valid factory" do
    expect(build(:character_group)).to be_valid
  end

  let(:character_group) { build(:character_group) }

  describe "ActiveModel validations" do
    # it { expect(character_group).to validate_presence_of(:last_name) }
  end

  describe "ActiveRecord associations" do
      it { expect(character_group).to belong_to(:play) }

      it { expect(character_group).to have_many(:characters).dependent(:destroy) }
      it { expect(character_group).to have_many(:on_stages).dependent(:destroy) }
      it { expect(character_group).to have_many(:lines).dependent(:destroy) }
      it { expect(character_group).to have_and_belong_to_many(:entrance_exits).dependent(:destroy) }
      it { expect(character_group).to have_and_belong_to_many(:stage_directions).dependent(:destroy) }
  end
end
