class Play < ApplicationRecord
  belongs_to :author
  belongs_to :production, optional: true

  default_scope {order(:title)}

  has_many :acts, -> { order(:number) }, dependent: :destroy
  has_many :characters, -> { order(:name) }, dependent: :destroy
  has_many :scenes, through: :acts
  validates :title, presence: true
end
