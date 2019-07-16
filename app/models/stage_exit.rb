class StageExit < ApplicationRecord
  belongs_to :production
  validates_presence_of :name

  default_scope { order('name ASC') }
end
