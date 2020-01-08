class Character < ApplicationRecord
  belongs_to :play
  belongs_to :job, optional: :true
  belongs_to :character_group, optional: :true
  has_many :on_stages, dependent: :destroy
  has_many :french_scenes, through: :on_stages
  has_many :lines, dependent: :destroy
  has_and_belongs_to_many :entrance_exits
  has_and_belongs_to_many :stage_directions
  default_scope { order('name ASC') }
  validates :name, presence: true

  before_save :downcase_gender_and_age

  private
  def downcase_gender_and_age
    if self.gender
      self.gender = self.gender.downcase
    end
    if self.age
      self.age = self.age.downcase
    end
  end
end
