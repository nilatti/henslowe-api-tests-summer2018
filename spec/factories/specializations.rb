FactoryBot.define do
  factory :specialization do
    title { Faker::BossaNova.song }
    description { Faker::GreekPhilosophers.quote }
  end
end
