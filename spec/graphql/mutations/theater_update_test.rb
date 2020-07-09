require 'rails_helper'

module Mutations
  module Theaters
    RSpec.describe TheaterUpdate, type: :request do
      describe '.resolve' do
        before(:all) do
          @theater = create(:theater)
          @theater_update = build(:theater)
        end
        it 'updates a theater' do
          post '/api/graphql', params: { query: theater_query(theater_id: @theater.id) }
          expect(@theater.reload).to have_attributes(
            calendar_url: @theater_update.calendar_url,
            city: @theater_update.city,
            mission_statement: @theater_update.mission_statement,
            name: @theater_update.name,
            phone_number: @theater_update.phone_number,
            state: @theater_update.state,
            street_address: @theater_update.street_address,
            website: @theater_update.website,
            zip: @theater_update.zip,
          )
        end

        it 'returns a theater' do
          post '/api/graphql', params: { query: theater_query(theater_id: @theater.id) }
          json = JSON.parse(response.body)
          data = json['data']['updateTheater']['theater']

          expect(data).to include(
            'calendarUrl' => @theater_update.calendar_url,
            'city' => @theater_update.city,
            'missionStatement' => @theater_update.mission_statement,
            'name' => @theater_update.name,
            'phoneNumber' => @theater_update.phone_number,
            'state' => @theater_update.state,
            'streetAddress' => @theater_update.street_address,
            'website' => @theater_update.website,
            'zip' => @theater_update.zip,
          )
        end
      end

      def theater_query(theater_id:)
        <<~GQL
          mutation {
            theaterUpdate(input: {
              calendarUrl: "#{@theater_update.calendar_url}"
              city: "#{@theater_update.city}"
              id: #{@theater.id}
              missionStatement: "#{@theater_update.mission_statement}"
              name: "#{@theater_update.name}"
              phoneNumber: "#{@theater_update.phone_number}"
              state: "#{@theater_update.state}"
              streetAddress: "#{@theater_update.street_address}"
              website: "#{@theater_update.website}"
              zip: "#{@theater_update.zip}"
            }
            ) {
              theater {
                calendarUrl
                city
                id
                missionStatement
                name
                phoneNumber
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
