FactoryBot.define do
  factory :job do
    start_date { Faker::Date.between(from: 2.years.ago, to: 1.year.ago) }
    end_date { Faker::Date.between(from: 1.year.ago, to: 3.months.ago) }
    production
    specialization
    theater
    user
  end
end
