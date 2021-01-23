require 'rails_helper'

RSpec.describe Space, type: :model do
  it "has a valid factory" do
    expect(build(:space)).to be_valid
  end

  let(:space) { build(:space) }
  describe "ActiveRecord associations" do
    it { expect(space).to have_many(:space_agreements).dependent(:destroy) }
    it { expect(space).to have_many(:theaters).through(:space_agreements) }
  end
  it { expect(space).to validate_presence_of(:name)}
end
