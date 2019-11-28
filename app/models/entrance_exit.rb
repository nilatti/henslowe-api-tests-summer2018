class EntranceExit < ApplicationRecord
  belongs_to :french_scene
  has_and_belongs_to_many :characters
  belongs_to :stage_exit
end
