class Rehearsal < ApplicationRecord
  belongs_to :space, optional: true
  belongs_to :production
  has_and_belongs_to_many :acts
  has_and_belongs_to_many :scenes
  has_and_belongs_to_many :french_scenes
  has_and_belongs_to_many :users
end
