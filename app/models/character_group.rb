class CharacterGroup < ApplicationRecord
  belongs_to :play
  has_many :characters
end
