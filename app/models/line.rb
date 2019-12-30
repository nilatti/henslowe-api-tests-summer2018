class Line < ApplicationRecord
  belongs_to :character
  belongs_to :french_scene
  has_many :words
end
