FactoryBot.define do
  factory :author do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    birthdate { Faker::Date.birthday(18, 65) }
    deathdate { Faker::Date.between(2.days.ago, Date.today) }
    nationality { Faker::Nation.nationality }
    gender { Faker::Gender.binary_type }

    after(:create) do |author|
      create_list(:play, 3, author: author)
    end
  end
end
