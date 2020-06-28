require 'rails_helper'

# Test suite for the Play model
RSpec.describe Play, type: :model do
  # Association test
  # ensure an item record belongs to a single author record
  it { should belong_to(:author) }
  # Validation test
  # ensure column name is present before saving
  it { should validate_presence_of(:title) }
end
