class EntranceExit < ApplicationRecord
  belongs_to :french_scene
  has_and_belongs_to_many :characters, dependent: :destroy, optional: true
  has_and_belongs_to_many :character_groups, dependent: :destroy, optional: true
  belongs_to :stage_exit, optional: true

  validates_presence_of :category, :stage_exit, :french_scene
  validate :somebody

  def somebody
    if !characters && !character_groups
      errors.add(:entrance_exit, "Must have at least one character or character group")
    end
  end

end
