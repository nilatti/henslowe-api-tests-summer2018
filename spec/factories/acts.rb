FactoryBot.define do
  factory :act do
    number { Faker::Number.within(range: 1..10) }
    summary { Faker:: Hipster.sentence}
    play

    after(:create) do |act|
      create_list(:scene, 3, act: act)
    end
  end
end
