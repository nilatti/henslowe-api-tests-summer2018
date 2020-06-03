require 'rails_helper'

module Types
    RSpec.describe QueryType, type: :request do
      before(:all) do
        @author = create(:author)
      end
      it 'returns authors' do
        post '/api/graphql', params: { query: query() }
        json = JSON.parse(response.body)
        data = json['data']['authors']
        expect(data).to include(
          'id' => be_present,
          'birthdate' => @author.birthdate.strftime("%Y-%m-%d"),
          'deathdate' => @author.deathdate.strftime("%Y-%m-%d"),
          'firstName' => @author.first_name,
          'gender' => @author.gender,
          'lastName' => @author.last_name,
          'middleName' => @author.middle_name,
          'nationality' => @author.nationality
        )
      end

      def query()
        <<~GQL
          query {
            authors {
              birthdate
              deathdate
              firstName
              gender
              id
              lastName
              middleName
              nationality
            }
          }
        GQL
      end
    end
  end
