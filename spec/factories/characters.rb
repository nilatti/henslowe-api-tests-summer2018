FactoryBot.define do
  factory :character do
    name { Faker::Movies::PrincessBride.character }
    gender { 'Female' }
    age { 'Adult' }
    description {'short but cute'}
    play
  end
end
