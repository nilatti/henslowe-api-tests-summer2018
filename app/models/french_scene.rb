class FrenchScene < ApplicationRecord
  belongs_to :scene

  validates :number, presence: true

  default_scope {order(:number)}
end
