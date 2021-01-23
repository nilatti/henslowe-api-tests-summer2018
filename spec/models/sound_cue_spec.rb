require 'rails_helper'

RSpec.describe SoundCue, type: :model do
  it "has a valid factory" do
    expect(build(:sound_cue)).to be_valid
  end

  let(:sound_cue) { build(:sound_cue) }
  describe "ActiveRecord associations" do
    it { expect(sound_cue).to belong_to(:french_scene) }
  end

end
