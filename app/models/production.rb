class Production < ApplicationRecord
  belongs_to :theater
  has_one :play
end
