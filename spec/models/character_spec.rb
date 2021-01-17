require 'rails_helper'

RSpec.describe Character, type: :model do
  it "has a valid factory" do
    # Using the shortened version of FactoryGirl syntax.
    # Add:  "config.include FactoryGirl::Syntax::Methods" (no quotes) to your spec_helper.rb
    expect(build(:character)).to be_valid
  end

  # Lazily loaded to ensure it's only used when it's needed
  # RSpec tip: Try to avoid @instance_variables if possible. They're slow.
  let(:character) { build(:character) }

  describe "ActiveModel validations" do
        # Basic validations
    it { expect(character).to validate_presence_of(:name) }

    # Format validations
    # Inclusion/acceptance of values
  end

  describe "ActiveRecord associations" do
      it { expect(character).to belong_to(:play) }
      it { expect(character).to belong_to(:character_group).optional(true) }
      it { expect(character).to have_many(:jobs).dependent(:destroy) }
      it { expect(character).to have_many(:on_stages).dependent(:destroy) }
      it { expect(character).to have_many(:french_scenes).through(:on_stages) }
      it { expect(character).to have_many(:lines).dependent(:destroy) }
      it { expect(character).to have_and_belong_to_many(:entrance_exits).dependent(:destroy) }
      it { expect(character).to have_and_belong_to_many(:stage_directions).dependent(:destroy) }

  end

  describe "private instance methods" do
    context "executes methods correctly" do
      context "#downcase_gender_and_age" do
        it "downcases gender and age" do
          upcase_character = create(:character, age: "Baby", gender: "Neutral")
          expect(upcase_character.age).to match(/baby/)
          expect(upcase_character.gender).to match(/neutral/)
        end
      end
    end
  end
end
