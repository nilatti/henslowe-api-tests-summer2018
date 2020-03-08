class StageDirection < ApplicationRecord
  belongs_to :french_scene
  has_and_belongs_to_many :characters, dependent: :destroy
  has_and_belongs_to_many :character_groups, dependent: :destroy
end
