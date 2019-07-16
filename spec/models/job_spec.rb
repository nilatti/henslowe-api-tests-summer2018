require 'rails_helper'

RSpec.describe Job, type: :model do
  it 'validate_dates' do
    subject.start_date = Date.now
    subject.end_date = Date.now - 5.days
    subject.valid?
    subject.errors[:end_date].should include('can\'t be before start date')
  end
end
