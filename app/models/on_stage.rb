class OnStage < ApplicationRecord
  belongs_to :character, optional: true
  # belongs_to :user, optional: true
  belongs_to :french_scene, optional: true
end
