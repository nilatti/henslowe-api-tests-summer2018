require 'rails_helper'

RSpec.describe FrenchScene, type: :model do
  it { should belong_to(:scene) }
  it { should validate_presence_of(:number) }
  it { should have_many (:characters)}
end
