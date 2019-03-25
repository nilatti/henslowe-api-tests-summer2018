class Author < ApplicationRecord
  has_many :plays, dependent: :destroy

  default_scope { order('last_name ASC') }
  validates :last_name, presence: true
end
