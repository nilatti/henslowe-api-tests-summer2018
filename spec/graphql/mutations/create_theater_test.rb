require 'rails_helper'

module Mutations
  module Theaters
    RSpec.describe CreateTheater, type: :request do
      describe '.resolve' do
        before(:all) do
          @theater = build(:theater)
        end
        it 'creates a theater' do
          expect do
            post '/api/graphql', params: { query: theater_query }
          end.to change {Theater.count }.by(1)
        end

        it 'returns a theater' do
          post '/api/graphql', params: { query: theater_query }
          json = JSON.parse(response.body)
          data = json['data']['createTheater']['theater']

          expect(data).to include(
            'calendarUrl' => @theater.calendar_url,
            'city' => @theater.city,
            'missionStatement' => @theater.mission_statement,
            'name' => @theater.name,
            'phoneNumber' => @theater.phone_number,
            'state' => @theater.state,
            'streetAddress' => @theater.street_address,
            'website' => @theater.website,
            'zip' => @theater.zip,
          )
        end
      end

      def theater_query
        <<~GQL
          mutation {
            createTheater(input: {
              calendarUrl: "#{@theater.calendar_url}"
              city: "#{@theater.city}"
              missionStatement: "#{@theater.mission_statement}"
              name: "#{@theater.name}"
              phoneNumber: "#{@theater.phone_number}"
              state: "#{@theater.state}"
              streetAddress: "#{@theater.street_address}"
              website: "#{@theater.website}"
              zip: "#{@theater.zip}"
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
