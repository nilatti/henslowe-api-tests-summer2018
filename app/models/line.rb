class Line < ApplicationRecord
  belongs_to :character, optional: true
  belongs_to :character_group, optional: true
  belongs_to :french_scene
  has_many :words, dependent: :destroy
  accepts_nested_attributes_for :words

  # after_save :update_line_counts

  def update_line_counts
    CountLines.new(lines: [self], play: self.french_scene.scene.act.play).run
  end
end
