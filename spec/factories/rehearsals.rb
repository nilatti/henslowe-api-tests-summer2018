FactoryBot.define do
  factory :rehearsal do
    end_time { Faker::Time.between(from: DateTime.now + 1, to: DateTime.now + 3) }
    notes { Faker::Quotes::Shakespeare.romeo_and_juliet_quote}
    title {Faker::Movies::PrincessBride.character }
    production
    space
    start_time { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) }
  end
end
