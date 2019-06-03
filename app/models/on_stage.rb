class OnStage < ApplicationRecord
  belongs_to :character, optional: true
  # belongs_to :user, optional: true
  belongs_to :french_scene, optional: true

  before_save :set_category, if: :category_unset?

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
