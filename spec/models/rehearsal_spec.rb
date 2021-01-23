require 'rails_helper'

RSpec.describe Rehearsal, type: :model do
  it "has a valid factory" do
    expect(build(:rehearsal)).to be_valid
  end

  let(:rehearsal) { build(:rehearsal) }

  describe "ActiveRecord associations" do
    it { expect(rehearsal).to belong_to(:space).optional }
    it { expect(rehearsal).to belong_to(:production) }
    it { expect(rehearsal).to have_and_belong_to_many(:acts) }
    it { expect(rehearsal).to have_and_belong_to_many(:scenes) }
    it { expect(rehearsal).to have_and_belong_to_many(:french_scenes) }
    it { expect(rehearsal).to have_and_belong_to_many(:users) }
  end

end
