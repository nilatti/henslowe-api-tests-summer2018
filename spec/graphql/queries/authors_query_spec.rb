require 'rails_helper'

module Types
    RSpec.describe QueryType, type: :request do
      before(:all) do
        @author = create(:author)
        @play = create(:play, author: @author)
      end
      it 'returns authors' do
        post '/api/graphql', params: { query: authors_query }
        json = JSON.parse(response.body)
        puts json
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

      it 'returns an author' do
        post '/api/graphql', params: { query: author_query(id: @author.id) }
        json = JSON.parse(response.body)
        data = json['data']['author']
        expect(data).to include(
          'id' => be_present,
          'birthdate' => @author.birthdate.strftime("%Y-%m-%d"),
          'deathdate' => @author.deathdate.strftime("%Y-%m-%d"),
          'firstName' => @author.first_name,
          'gender' => @author.gender,
          'lastName' => @author.last_name,
          'middleName' => @author.middle_name,
          'nationality' => @author.nationality,
          'plays' => be_present
        )
        expect(data['plays'].first['title']).to eq(@author.plays.first.title)
      end

      def authors_query
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

      def author_query(id:)
        <<~GQL
          query {
            author (id: #{id}) {
              birthdate
              deathdate
              firstName
              gender
              id
              lastName
              middleName
              nationality
              plays {
                title
              }
            }
          }
        GQL
      end
    end
  end
