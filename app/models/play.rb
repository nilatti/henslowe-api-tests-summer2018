class Play < ApplicationRecord
  belongs_to :author

  has_many :acts, -> { order(:act_number) }, dependent: :destroy
  has_many :characters, -> { order(:name) }, dependent: :destroy

  validates :title, presence: true
end
