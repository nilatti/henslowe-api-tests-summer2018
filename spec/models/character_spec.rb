require 'rails_helper'

RSpec.describe Character, type: :model do
  # Association test
  it { should belong_to(:play) }
  # Validation tests
  # ensure columns title and created_by are present before saving
  
  it { should validate_presence_of(:name) }
end
