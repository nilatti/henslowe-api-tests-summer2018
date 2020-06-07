require 'rails_helper'

module Mutations
  module Authors
    RSpec.describe UpdateAuthor, type: :request do
      describe '.resolve' do
        before(:all) do
          @author = create(:author)
          @author_update = build(:author)
        end
        it 'updates an author' do
          post '/api/graphql', params: { query: author_query(id: @author.id) }
          expect(@author.reload).to have_attributes(
            birthdate: @author_update.birthdate,
            deathdate: @author_update.deathdate,
            first_name: @author_update.first_name,
            gender: @author_update.gender,
            last_name: @author_update.last_name,
            middle_name: @author_update.middle_name,
            nationality: @author_update.nationality,
          )
        end
        it 'returns updated author' do
          post '/api/graphql', params: { query: author_query(id: @author.id) }
          json = JSON.parse(response.body)
          data = json['data']['updateAuthor']['author']

          expect(data).to include(
            'birthdate' => @author_update.birthdate.strftime("%Y-%m-%d"),
            'deathdate' => @author_update.deathdate.strftime("%Y-%m-%d"),
            'firstName' => @author_update.first_name,
            'gender' => @author_update.gender,
            'lastName' => @author_update.last_name,
            'middleName' => @author_update.middle_name,
            'nationality' => @author_update.nationality,
          )
        end
      end

      def author_query(id:)
        <<~GQL
          mutation {
            updateAuthor(
              input: {
              id: #{@author.id},
              birthdate: "#{@author_update.birthdate}"
              deathdate: "#{@author_update.deathdate}"
              firstName: "#{@author_update.first_name}"
              gender: "#{@author_update.gender}"
              lastName: "#{@author_update.last_name}"
              middleName: "#{@author_update.middle_name}"
              nationality: "#{@author_update.nationality}"}
            ) {
              author {
                id
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
