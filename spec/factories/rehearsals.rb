FactoryBot.define do
  factory :rehearsal do
    end_time { Faker::Time.forward(days: 1, period: :evening)  }
    notes { Faker::Quotes::Shakespeare.king_richard_iii_quote}
    start_time { Faker::Time.forward(days: 1, period: :afternoon) }
    title { Faker::GreekPhilosophers.quote}
    production
    space

    trait :no_space do
      space {nil}
    end
  end
end
