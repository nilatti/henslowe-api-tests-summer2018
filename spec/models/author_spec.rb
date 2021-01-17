require 'rails_helper'

describe Author do

  it "has a valid factory" do
    expect(build(:author)).to be_valid
  end

  let(:author) { build(:author) }

  describe "ActiveModel validations" do
    it { expect(author).to validate_presence_of(:last_name) }
  end

  describe "ActiveRecord associations" do
      it { expect(author).to have_many(:plays).dependent(:destroy) }
  end
end
