FactoryBot.define do
  factory :play do
    title { Faker::Hipster.sentence }
    author_id { nil }
  end
end
