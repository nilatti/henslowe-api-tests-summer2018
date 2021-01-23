class EntranceExit < ApplicationRecord
  belongs_to :french_scene
  has_and_belongs_to_many :characters, dependent: :destroy, optional: true
  has_and_belongs_to_many :character_groups, dependent: :destroy, optional: true
  belongs_to :stage_exit
  belongs_to :user, optional: true

  validates_presence_of :category, :stage_exit, :french_scene
end
