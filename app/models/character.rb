class Character < ApplicationRecord
  belongs_to :play
  default_scope { order('name ASC') }
  validates :name, presence: true
end
