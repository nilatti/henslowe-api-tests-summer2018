require 'rails_helper'

RSpec.describe Theater, type: :model do
  # Association test

  # Validation tests
  # ensure columns title and created_by are present before saving
  it { should validate_presence_of(:name) }
end
