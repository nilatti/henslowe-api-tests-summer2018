class EntranceExit < ApplicationRecord
  belongs_to :french_scene
  belongs_to :character
  belongs_to :stage_exit

end
