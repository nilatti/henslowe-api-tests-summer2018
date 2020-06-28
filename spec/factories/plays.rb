FactoryBot.define do
  factory :play do
    title { Faker::Hipster.sentence }
    date { Faker::Date.between(from: 400.years.ago, to: Date.today) }
    genre {['comedy', 'musical']}
    author

    after(:create) do |play|
      create_list(:character, 3, play: play)
      create_list(:act, 3, play: play)
    end
  end
end
