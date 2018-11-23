class Author < ApplicationRecord
  has_many :plays, dependent: :destroy
  # validates :last_name, presence: true
end
