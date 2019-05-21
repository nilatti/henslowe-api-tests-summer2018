class Character < ApplicationRecord
  belongs_to :play
  has_many :on_stages
  has_many :french_scenes, through: :on_stages
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
