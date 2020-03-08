class FrenchScene < ApplicationRecord
  belongs_to :scene
  has_many :entrance_exits, dependent: :destroy
  has_many :lines, dependent: :destroy
  # has_many :labels, dependent: :destroy
  has_many :sound_cues, dependent: :destroy
  has_many :on_stages, dependent: :destroy
  accepts_nested_attributes_for :on_stages, reject_if: :all_blank, allow_destroy: :true
  has_many :characters, through: :on_stages
  has_many :character_groups, through: :on_stages
  has_many :users, through: :on_stages
  has_many :stage_directions, dependent: :destroy

  validates :number, presence: true

  default_scope {order(:number)}

  def pretty_name
    "this is the pretty name"
  end
end
