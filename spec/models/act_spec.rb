require 'rails_helper'

RSpec.describe Act, type: :model do
  it "has a valid factory" do
    # Using the shortened version of FactoryGirl syntax.
    # Add:  "config.include FactoryGirl::Syntax::Methods" (no quotes) to your spec_helper.rb
    expect(build(:act)).to be_valid
  end
  let(:act) { build(:act) }

  describe "ActiveModel validations" do
    # http://guides.rubyonrails.org/active_record_validations.html
    # http://rubydoc.info/github/thoughtbot/shoulda-matchers/master/frames
    # http://rubydoc.info/github/thoughtbot/shoulda-matchers/master/Shoulda/Matchers/ActiveModel

    # Basic validations
    it { expect(act).to validate_presence_of(:number) }

    # Format validations
    # Inclusion/acceptance of values
  end

  describe "ActiveRecord associations" do
      it { expect(act).to have_many(:scenes) }
      it { expect(act).to belong_to(:play) }
  end
end
