require 'rails_helper'

RSpec.describe Scene, type: :model do
  it { should belong_to(:act) }
  it { should validate_presence_of(:number) }
end
