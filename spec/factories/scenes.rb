FactoryBot.define do
  factory :scene do
    number { Faker::Number.within(range: 1..10) }
    summary { Faker:: Hipster.sentence}
    act

    after(:create) do |scene|
      create_list(:french_scene, 3, scene: scene)
    end
  end
end
