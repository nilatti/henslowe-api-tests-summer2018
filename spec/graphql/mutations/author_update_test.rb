require 'rails_helper'

module Mutations
  module Authors
    RSpec.describe AuthorUpdate, type: :request do
      describe '.resolve' do
        before(:all) do
          @author1 = create(:author)
          @author1_update = build(:author)
          @author2 = create(:author)
          @author2_update = build(:author)
        end
        it 'updates an author' do
          post '/api/graphql', params: { query: author_query(id: @author1.id) }
          expect(@author1.reload).to have_attributes(
            birthdate: @author1_update.birthdate,
            deathdate: @author1_update.deathdate,
            first_name: @author1_update.first_name,
            gender: @author1_update.gender,
            last_name: @author1_update.last_name,
            middle_name: @author1_update.middle_name,
            nationality: @author1_update.nationality,
          )
        end
        it 'updates an author with some missing params without messing up originals' do
          original_birthdate = @author2.birthdate
          original_nationality = @author2.nationality
          update_first_name = @author2_update.first_name
          post '/api/graphql', params: { query: author_query_with_missing(id: @author2.id) }
          puts JSON.parse(response.body)
          updated_author = @author2.reload
          expect(updated_author.first_name).to eq(update_first_name)
          expect(updated_author.birthdate).to eq(original_birthdate)
          expect(updated_author.nationality).to eq(original_nationality)
        end
        it 'returns updated author' do
          post '/api/graphql', params: { query: author_query(id: @author1.id) }
          json = JSON.parse(response.body)
          data = json['data']['authorUpdate']['author']

          expect(data).to include(
            'birthdate' => @author1_update.birthdate.strftime("%Y-%m-%d"),
            'deathdate' => @author1_update.deathdate.strftime("%Y-%m-%d"),
            'firstName' => @author1_update.first_name,
            'gender' => @author1_update.gender,
            'lastName' => @author1_update.last_name,
            'middleName' => @author1_update.middle_name,
            'nationality' => @author1_update.nationality,
          )
        end
      end

      def author_query(id:)
        <<~GQL
          mutation {
            authorUpdate(
              input: {
              id: #{id},
              birthdate: "#{@author1_update.birthdate}"
              deathdate: "#{@author1_update.deathdate}"
              firstName: "#{@author1_update.first_name}"
              gender: "#{@author1_update.gender}"
              lastName: "#{@author1_update.last_name}"
              middleName: "#{@author1_update.middle_name}"
              nationality: "#{@author1_update.nationality}"}
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

      def author_query_with_missing(id:)
        <<~GQL
          mutation {
            authorUpdate(
              input: {
              id: #{id},
              firstName: "#{@author2_update.first_name}"
              gender: "#{@author2_update.gender}"
              lastName: "#{@author2_update.last_name}"
              middleName: "#{@author2_update.middle_name}"
            }
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
