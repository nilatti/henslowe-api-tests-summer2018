FactoryBot.define do
  factory :production do
    theater
    play
    start_date { Faker::Date.between(from: Date.today, to: 1.year.from_now) }
    end_date { Faker::Date.between(from: 1.year.from_now, to: 2.years.from_now) }
    lines_per_minute { 20 }
  end
end
