FactoryBot.define do
  factory :character do
    name { Faker::Movies::PrincessBride.character }
    gender { 'Female' }
    age { 'Adult' }
    description {'short but cute'}
    xml_id { "Rosalind_AYL"}
    corresp { "#test" }
    play
  end
end
