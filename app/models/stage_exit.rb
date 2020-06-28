class StageExit < ApplicationRecord
  belongs_to :production
  has_many :entrance_exits
  validates_presence_of :name

  default_scope { order('name ASC') }
end
