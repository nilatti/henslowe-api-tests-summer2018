FactoryBot.define do
  factory :french_scene do
    number { 'a' }
    summary { Faker:: Hipster.sentence}
    scene
  end
end
