class EntranceExit < ApplicationRecord
  belongs_to :french_scene
  belongs_to :user
  belongs_to :stage_exit
end
