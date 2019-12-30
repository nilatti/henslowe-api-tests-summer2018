class FrenchScene < ApplicationRecord
  belongs_to :scene
  has_many :entrance_exits, dependent: :destroy
  has_many :lines, dependent: :destroy
  has_many :labels, dependent: :destroy
  has_many :sound_cues 
  has_many :on_stages, dependent: :destroy
  accepts_nested_attributes_for :on_stages, reject_if: :all_blank, allow_destroy: :true
  has_many :characters, through: :on_stages
  has_many :users, through: :on_stages

  validates :number, presence: true

  default_scope {order(:number)}
end
