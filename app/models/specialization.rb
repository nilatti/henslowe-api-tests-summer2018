class Specialization < ApplicationRecord
  validates :title, presence: true
  belongs_to :job

  scope :actor, -> { where title: 'Actor' }
  scope :auditioner, -> { where title: 'Auditioner' }
  scope :actor_or_auditioner, -> { actor.or(auditioner)}
end
