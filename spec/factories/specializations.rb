FactoryBot.define do
  factory :specialization do
    title { Faker::BossaNova.song }
    description { Faker::GreekPhilosophers.quote }

    trait :actor do 
      title { 'Actor' }
    end

    trait :auditioner do 
      title { 'Auditioner' }
    end
  end
end
