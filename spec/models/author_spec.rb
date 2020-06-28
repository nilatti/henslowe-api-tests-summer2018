require 'rails_helper'

RSpec.describe Author, type: :model do
  # Association test
  # ensure Author model has a 1:m relationship with the Play model
  it { should have_many(:plays).dependent(:destroy) }
  # Validation tests
  # ensure columns title and created_by are present before saving
  it { should validate_presence_of(:last_name) }
end
