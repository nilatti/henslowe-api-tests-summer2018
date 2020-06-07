require 'rails_helper'

module Types
    RSpec.describe QueryType, type: :request do
      before(:all) do
        @space = create(:space)
      end
      it 'returns spaces' do
        post '/api/graphql', params: { query: spaces_query }
        json = JSON.parse(response.body)
        data = json['data']['spaces']
        expect(data).to include(
          'city' => @space.city,
          'missionStatement' => @space.mission_statement,
          'name' => @space.name,
          'phoneNumber' => @space.phone_number,
          'seatingCapacity' => @space.seating_capacity,
          'state' => @space.state,
          'streetAddress' => @space.street_address,
          'website' => @space.website,
          'zip' => @space.zip,
        )
      end

      it 'returns a space' do
        post '/api/graphql', params: { query: space_query(id: @space.id) }
        json = JSON.parse(response.body)
        puts json
        data = json['data']['space']
        expect(data).to include(
          'city' => @space.city,
          'missionStatement' => @space.mission_statement,
          'name' => @space.name,
          'phoneNumber' => @space.phone_number,
          'seatingCapacity' => @space.seating_capacity,
          'state' => @space.state,
          'streetAddress' => @space.street_address,
          'website' => @space.website,
          'zip' => @space.zip,
        )
      end



      def spaces_query
          <<~GQL
          query {
            spaces {
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
        GQL
      end

      def space_query(id:)
        <<~GQL
          query {
            space (id: #{id}) {
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
      GQL
      end
    end
  end
