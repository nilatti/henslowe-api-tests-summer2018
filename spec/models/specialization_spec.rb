require 'rails_helper'

RSpec.describe Specialization, type: :model do
  it "has a valid factory" do
    expect(build(:specialization)).to be_valid
  end

  let(:specialization) { build(:specialization) }

  it { expect(specialization).to validate_presence_of(:title)}

  it "scopes function" do
    actor_specialization = create(:specialization, title: 'Actor')
    auditioner_specialization = create(:specialization, title: 'Auditioner')

    expect(Specialization.actor).to match_array([actor_specialization])
    expect(Specialization.auditioner).to match_array([auditioner_specialization])
    expect(Specialization.actor_or_auditioner).to match_array([actor_specialization].push(auditioner_specialization))
  end
end
