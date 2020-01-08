class Act < ApplicationRecord
  belongs_to :play
  has_many :scenes, dependent: :destroy
  default_scope {order(:number)}

  validates :number, presence: true
end
