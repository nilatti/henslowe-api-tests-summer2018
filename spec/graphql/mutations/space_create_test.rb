require 'rails_helper'

module Mutations
  module Spaces
    RSpec.describe SpaceCreate, type: :request do
      describe '.resolve' do
        before(:all) do
          @space = build(:space)
        end
        it 'creates a space' do
          expect do
            post '/api/graphql', params: { query: space_query }
          end.to change {Space.count }.by(1)
        end

        it 'returns a space' do
          puts "space size#{@space.seating_capacity} #{@space.seating_capacity.class}"
          post '/api/graphql', params: { query: space_query }
          json = JSON.parse(response.body)
          puts(json)
          data = json['data']['createSpace']['space']

          expect(data).to include(
            'city' => @space.city,
            'missionStatement' => @space.mission_statement,
            'name' => @space.name,
            'phoneNumber' => @space.phone_number,
            'seatingCapacity' => @space.seating_capacity,
            'state' => @space.state,
            'streetAddress' => @space.street_address,
            'website' => @space.website,
            'zip' => @space.zip
          )
        end
      end

      def space_query
        <<~GQL
          mutation {
            spaceCreate(input: {
              city: "#{@space.city}",
              missionStatement: "#{@space.mission_statement}",
              name: "#{@space.name}",
              phoneNumber: "#{@space.phone_number}",
              seatingCapacity: #{@space.seating_capacity},
              state: "#{@space.state}",
              streetAddress: "#{@space.street_address}",
              website: "#{@space.website}",
              zip: "#{@space.zip}"
            }
            ) {
              space {
                city
                missionStatement
                name
                phoneNumber
                seatingCapacity
                state
                streetAddress
                website
                zip
              }
            }
          }
        GQL
      end
    end
  end
end
