class Rehearsal < ApplicationRecord
  belongs_to :space, optional: true
  belongs_to :production
end
