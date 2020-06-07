require 'rails_helper'

module Mutations
  module Authors
    RSpec.describe CreateAuthor, type: :request do
      describe '.resolve' do
        before(:all) do
          @author = build(:author)
        end
        it 'creates a author' do
          expect do
            post '/api/graphql', params: { query: author_query }
          end.to change {Author.count }.by(1)
        end

        it 'returns a author' do
          post '/api/graphql', params: { query: author_query }
          json = JSON.parse(response.body)
          data = json['data']['createAuthor']['author']

          expect(data).to include(
            'birthdate' => @author.birthdate.strftime("%Y-%m-%d"),
            'deathdate' => @author.deathdate.strftime("%Y-%m-%d"),
            'firstName' => @author.first_name,
            'gender' => @author.gender,
            'lastName' => @author.last_name,
            'middleName' => @author.middle_name,
            'nationality' => @author.nationality,
          )
        end
      end

      def author_query
        <<~GQL
          mutation {
            createAuthor(input: {
              birthdate: "#{@author.birthdate}"
              deathdate: "#{@author.deathdate}"
              firstName: "#{@author.first_name}"
              gender: "#{@author.gender}"
              lastName: "#{@author.last_name}"
              middleName: "#{@author.middle_name}"
              nationality: "#{@author.nationality}"
            }
            ) {
              author {
                birthdate
                deathdate
                firstName
                gender
                lastName
                middleName
                nationality
              }
            }
          }
        GQL
      end
    end
  end
end
