class Job < ApplicationRecord
  include Filterable
  belongs_to :character, optional: true
  belongs_to :production, optional: true
  belongs_to :specialization
  belongs_to :theater
  belongs_to :user, optional: true

  scope :production, -> (production) { where production: production }
  scope :specialization, -> (specialization) { where specialization: specialization }
  scope :theater, -> (theater) { where theater: theater }
  scope :user, -> (user) { where user: user }


  validate :end_date_after_start_date

private
  def end_date_after_start_date
     if start_date > end_date
       errors.add(:end_date, "can't be before start date")
     end
  end
end
