class Line < ApplicationRecord
  belongs_to :character
  belongs_to :character_group, optional: true
  belongs_to :french_scene
  has_many :words, dependent: :destroy
end
