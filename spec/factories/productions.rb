FactoryBot.define do
  factory :production do
    theater
    start_date { Faker::Date.between(from: Date.today, to: 1.year.from_now) }
    end_date { Faker::Date.between(from: 1.year.from_now, to: 2.years.from_now) }
    lines_per_minute { 20 }
  end

  trait :play_needed do
    after(:create) do |production|
      create(:play, production_id: production.id)
    end
  end
end
