class Scene < ApplicationRecord
  belongs_to :act
  has_many :french_scenes, dependent: :destroy
  has_many :lines, through: :french_scenes
  has_many :on_stages, through: :french_scenes
  has_and_belongs_to_many :rehearsals

  validates :number, presence: true

  default_scope {order(:number)}

  def pretty_name
    "#{self.act.number}.#{self.number}"
  end

  def find_on_stages
    on_stages_with_characters = self.on_stages.select { |os| !os.character.nil?}
    on_stages_with_characters.uniq! {|c| c.character_id }
    on_stages_with_character_groups = self.on_stages.select { |os| !os.character_group.nil?}
    on_stages_with_character_groups.uniq! {|c| c.character_group_id }
    return on_stages_with_characters.concat(on_stages_with_character_groups)
  end

  def self.play_order(scenes)
    scenes.sort_by(&:pretty_name)
  end

end
