class Scene < ApplicationRecord
  belongs_to :act
  has_many :french_scenes, dependent: :destroy

  validates :number, presence: true

  default_scope {order(:number)}
end
