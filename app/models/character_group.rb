class CharacterGroup < ApplicationRecord
  belongs_to :play
  has_many :characters
  has_and_belongs_to_many :stage_directions
end
