class Line < ApplicationRecord
  belongs_to :character, optional: true
  belongs_to :character_group, optional: true
  belongs_to :french_scene
  has_many :words, dependent: :destroy
  accepts_nested_attributes_for :words
end
