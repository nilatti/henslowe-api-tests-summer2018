class Character < ApplicationRecord
  belongs_to :play

  validates :name, presence: true
end
