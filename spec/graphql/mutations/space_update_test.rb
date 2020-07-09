require 'rails_helper'

module Mutations
  module Spaces
    RSpec.describe SpaceUpdate, type: :request do
      describe '.resolve' do
        before(:all) do
          @space = create(:space)
          @space_update = build(:space)
        end
        it 'updates a space' do
          post '/api/graphql', params: { query: space_query(id: @space.id) }
          expect(@space.reload).to have_attributes(
            city:@space_update.city,
            mission_statement:@space_update.mission_statement,
            name:@space_update.name,
            phone_number:@space_update.phone_number,
            seating_capacity:@space_update.seating_capacity,
            state:@space_update.state,
            street_address:@space_update.street_address,
            website:@space_update.website,
            zip:@space_update.zip
          )
        end

        it 'returns updated space' do
          post '/api/graphql', params: { query: space_query(id: @space.id) }
          json = JSON.parse(response.body)
          data = json['data']['updateSpace']['space']

          expect(data).to include(
            'city' => @space_update.city,
            'missionStatement' => @space_update.mission_statement,
            'name' => @space_update.name,
            'phoneNumber' => @space_update.phone_number,
            'seatingCapacity' => @space_update.seating_capacity,
            'state' => @space_update.state,
            'streetAddress' => @space_update.street_address,
            'website' => @space_update.website,
            'zip' => @space_update.zip
          )
        end
      end

      def space_query(id:)
        <<~GQL
          mutation {
            spaceUpdate(input: {
              city: "#{@space_update.city}",
              id: #{@space.id},
              missionStatement: "#{@space_update.mission_statement}",
              name: "#{@space_update.name}",
              phoneNumber: "#{@space_update.phone_number}",
              seatingCapacity: #{@space_update.seating_capacity},
              state: "#{@space_update.state}",
              streetAddress: "#{@space_update.street_address}",
              website: "#{@space_update.website}",
              zip: "#{@space_update.zip}"
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
