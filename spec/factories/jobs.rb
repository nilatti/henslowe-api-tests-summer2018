FactoryBot.define do
  factory :job do
    start_date { Faker::Date.between(2.years.ago, 1.year.ago) }
    end_date { Faker::Date.between(1.year.ago, 3.months.ago) }
    production
    specialization
    theater
    user
  end
end
