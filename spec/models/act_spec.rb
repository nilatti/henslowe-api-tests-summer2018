require 'rails_helper'

RSpec.describe Act, type: :model do
  it { should belong_to(:play) }
  it { should validate_presence_of(:number) }
end
