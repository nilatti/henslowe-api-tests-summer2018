FactoryBot.define do
  factory :entrance_exit do
    page { Faker:: Number.within(range: 1...100)}
    line {Faker:: Number.within(range: 1...1000) }
    category {"entrance"}
    notes { Faker::GreekPhilosophers.quote}
    french_scene
    stage_exit

    after(:create) do |entrance_exit|
      create_list(:character, 3, entrance_exits: [entrance_exit])
    end
  end
end
