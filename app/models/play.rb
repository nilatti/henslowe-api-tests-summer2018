class Play < ApplicationRecord
  belongs_to :author
  belongs_to :production, optional: true

  default_scope {order(:title)}

  serialize :genre, Array
  has_many :words, dependent: :destroy #this is so that words can be created in a batch and then matched to lines
  has_many :acts, -> { order(:number) }, dependent: :destroy
  has_many :characters, -> { order(:name) }, dependent: :destroy
  has_many :character_groups, dependent: :destroy
  has_many :scenes, through: :acts
  has_many :french_scenes, through: :scenes
  has_many :on_stages, through: :french_scenes
  has_many :lines, through: :french_scenes
  validates :title, presence: true

  def find_on_stages
    on_stages_with_characters = self.on_stages.select { |os| !os.character.nil?}
    on_stages_with_characters.uniq! {|c| c.character_id }
    on_stages_with_character_groups = self.on_stages.select { |os| !os.character_group.nil?}
    on_stages_with_character_groups.uniq! {|c| c.character_group_id }
    return on_stages_with_characters.concat(on_stages_with_character_groups)
  end

end
