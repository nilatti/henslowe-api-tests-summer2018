FactoryBot.define do
  factory :author do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }

    after(:create) do |author|
      create_list(:play, 10, author: author)
    end
  end
end
