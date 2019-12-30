FactoryBot.define do
  factory :french_scene do
    number { 'a' }
    summary { Faker:: Hipster.sentence}
    scene

    # after(:create) do |french_scene|
    #   create_list(:entrance_exit, 3, french_scene: french_scene)
    #   create_list(:on_stage, 3, french_scene: french_scene)
    # end
  end
end
