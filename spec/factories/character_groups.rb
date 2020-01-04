FactoryBot.define do
  factory :character_group do
    name { Faker::Movies::PrincessBride.character }
    xml_id { "LORDS.DukeFrederick_AYL"}
    corresp { "#LORDS_AYL" }
    play
  end
end
