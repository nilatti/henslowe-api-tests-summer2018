require 'rails_helper'

RSpec.describe Space, type: :model do
  it { should have_many (:theaters)}
end
