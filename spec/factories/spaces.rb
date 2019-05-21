FactoryBot.define do
  factory :space do
    name { Faker::Artist.name }
    street_address { Faker::Address.street_address}
    city {Faker::Address.city}
    state { Faker::Address.state_abbr }
    zip {Faker::Address.zip}
    phone_number {Faker::PhoneNumber.phone_number}
    website {Faker::Internet.url}
    seating_capacity {Faker::Number.within(100..1000)}
    mission_statement {Faker::TvShows::MichaelScott.quote}

    after(:create) do |space|
        space.theaters << create(:theater)
    end
  end


end
