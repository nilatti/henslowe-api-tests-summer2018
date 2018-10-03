class Act < ApplicationRecord
  belongs_to :play

  validates :act_number, presence: true
end
