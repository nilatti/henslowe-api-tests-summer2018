FactoryBot.define do
  factory :play do
    title { Faker::Hipster.sentence }
    date { Faker::Date.between(400.years.ago, Date.today) }
    genre { 'Comedy' }
    author

    after(:create) do |play|
      create_list(:character, 3, play: play)
      create_list(:act, 3, play: play)
    end
  end
end
