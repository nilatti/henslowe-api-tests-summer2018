FactoryBot.define do
  factory :author do
    birthdate { Faker::Date.birthday(min_age: 18, max_age: 65) }
    deathdate { Faker::Date.between(from: 2.days.ago, to: Date.today) }
    first_name { Faker::Name.first_name }
    gender { Faker::Gender.binary_type }
    last_name { Faker::Name.last_name }
    middle_name { Faker::Name.first_name }
    nationality { Faker::Nation.nationality }

    after(:create) do |author|
      create_list(:play, 3, author: author)
    end
  end
end
