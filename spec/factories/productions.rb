FactoryBot.define do
  factory :production do
    theater
    start_date { Faker::Date.between(Date.today, 1.year.from_now) }
    end_date { Faker::Date.between(1.year.from_now, 2.years.from_now) }
  end
end
