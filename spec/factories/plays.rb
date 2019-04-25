FactoryBot.define do
  factory :play do
    title { Faker::Hipster.sentence }
    date { Faker::Date.between(400.years.ago, Date.today) }
    genre { 'Comedy' }
    author
  end
end
