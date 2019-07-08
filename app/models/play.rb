class Play < ApplicationRecord
  belongs_to :author
  belongs_to :production, optional: true

  default_scope {order(:title)}

  serialize :genre, Array

  has_many :acts, -> { order(:number) }, dependent: :destroy
  has_many :characters, -> { order(:name) }, dependent: :destroy
  has_many :scenes, through: :acts
  has_many :french_scenes, through: :scenes
  validates :title, presence: true
end
