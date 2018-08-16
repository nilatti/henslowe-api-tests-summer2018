class Play < ApplicationRecord
  belongs_to :author
  
  has_many :acts

  validates :title, presence: true
end
