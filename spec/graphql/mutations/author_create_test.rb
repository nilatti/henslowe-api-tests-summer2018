require 'rails_helper'

module Mutations
  module Authors
    RSpec.describe AuthorCreate, type: :request do
      describe '.resolve' do
        before(:all) do
          @author = build(:author)
        end
        it 'creates an author' do
          puts "called create author"
          expect do
            post '/api/graphql', params: { query: author_query }
          end.to change {Author.count }.by(1)
        end

        it 'creates an author, even if some of the info isn\'t present' do
          puts "called create author w missing"
          expect do
            post '/api/graphql', params: { query: author_query_with_missing }
            puts JSON.parse(response.body)
          end.to change {Author.count }.by(1)
        end

        it 'does not create an author when required info is missing' do
          expect do
            post '/api/graphql', params: { query: author_query_with_missing_required }
          end.to change {Author.count }.by(0)
        end

        it 'returns an author' do
          post '/api/graphql', params: { query: author_query }
          json = JSON.parse(response.body)
          data = json['data']['authorCreate']['author']

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
            authorCreate(input: {
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

      def author_query_with_missing
        <<~GQL
          mutation {
            authorCreate(input: {
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
                id
                lastName
                middleName
                nationality
              }
            }
          }
        GQL
      end

      def author_query_with_missing_required
        <<~GQL
          mutation {
            authorCreate(input: {
              birthdate: "#{@author.birthdate}"
              deathdate: "#{@author.deathdate}"
              firstName: "#{@author.first_name}"
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
