FactoryBot.define do
  factory :play do
    title { Faker::Hipster.sentence }
    author
  end
end
