require 'rails_helper'

RSpec.describe Theater, type: :model do
  it "has a valid factory" do
    expect(build(:theater)).to be_valid
  end

  let(:theater) { build(:theater) }
  describe "ActiveRecord associations" do
    it { expect(theater).to have_many(:productions) }
    it { expect(theater).to have_many(:space_agreements) }
    it { expect(theater).to have_many(:spaces).through(:space_agreements) }
  end
  it { expect(theater).to validate_presence_of(:name)}
  it "orders by name" do
    theater1 = create(:theater, name: "Drury Lane")
    theater3 = create(:theater, name: "Roy Rogers")
    theater2 = create(:theater, name: "Guthrie")
    expect(Theater.all.last).to eq(theater3)
  end
end
