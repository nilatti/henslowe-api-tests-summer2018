class OnStage < ApplicationRecord
  belongs_to :character, optional: true
  belongs_to :character_group, optional: true
  belongs_to :user, optional: true
  belongs_to :french_scene, optional: true

  before_save :set_category, if: :category_unset?
  validate :check_for_french_scene_and_at_least_one_character_or_group
  validates :character, uniqueness: { scope: :french_scene_id }, allow_blank: true, allow_nil: true
  validates :character_group, uniqueness: { scope: :french_scene_id }, allow_blank: true, allow_nil: true

  def check_for_french_scene_and_at_least_one_character_or_group
    if !french_scene
      errors.add(:on_stage, "Must have french scene")
    end
    if !character && !character_group
      errors.add(:on_stage, "Must have character or character group")
    end
  end

  private
  def category_unset?
    self.category.blank?
  end
  def set_category
    if !self.character.nil?
      self.category = "Character"
    else
      self.category = "Other"
    end
  end

end
