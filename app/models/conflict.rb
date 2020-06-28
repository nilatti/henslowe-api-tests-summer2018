class Conflict < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :space, optional: true
  validate :must_have_user_or_space
  validates :start_time, presence: true
  validates :end_time, presence: true

  def must_have_user_or_space
    if !user && !space
      errors.add(:user, "Must have either user or space")
    end
    if user && space
      errors.add(:user, "Can't have both user and space")
    end
  end
end
