require 'rails_helper'

RSpec.describe Word, type: :model do
  it "has a valid factory" do
    expect(build(:word)).to be_valid
  end

  let(:word) { build(:word) }
  describe "ActiveRecord associations" do
    it { expect(word).to belong_to(:play) }
    it { expect(word).to belong_to(:line).optional }
  end
end
