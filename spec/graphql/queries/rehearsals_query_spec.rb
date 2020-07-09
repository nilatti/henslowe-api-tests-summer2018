require 'rails_helper'

module Types
    RSpec.describe QueryType, type: :request do
      before(:all) do
        @rehearsal = create(:rehearsal)
        @users = []
        5.times {
            @users << create(:user)
        }

        5.times {create(:rehearsal, production: @rehearsal.production, users: @users)}
        create(:rehearsal)
      end
      it 'returns rehearsals' do
        post '/api/graphql', params: { query: rehearsals_query }
        json = JSON.parse(response.body)
        rehearsal = json['data']['rehearsals'].first
        expect(rehearsal['startTime']).to eq(@rehearsal.start_time.strftime("%Y-%m-%d %H:%M:%S UTC"))
        expect(rehearsal['endTime']).to eq(@rehearsal.end_time.strftime("%Y-%m-%d %H:%M:%S UTC"))
        expect(rehearsal['notes']).to eq(@rehearsal.notes)
        expect(rehearsal['title']).to eq(@rehearsal.title)
        expect(rehearsal['space']['name']).to eq(@rehearsal.space.name)
        expect(rehearsal['production']['id']).to eq(@rehearsal.production.id.to_s)
      end

      it 'returns rehearsals for a production' do
        post '/api/graphql', params: { query: production_rehearsals_query(production_id: @rehearsal.production.id) }
        json = JSON.parse(response.body)
        data = json['data']['production']['rehearsals']
        expect(data.size).to eq(6)
      end

      # it 'returns rehearsals for a user' do
      #   post '/api/graphql', params: { query: user_rehearsals_query(user_id: @users.first.id) }
      #   json = JSON.parse(response.body)
      #   puts json
      #   data = json['data']['user']['rehearsals']
      #   expect(data.size).to eq(5)
      # end

      it 'returns a rehearsal' do
        post '/api/graphql', params: { query: rehearsal_query(id: @rehearsal.id) }
        json = JSON.parse(response.body)
        data = json['data']['rehearsal']
        expect(data).to include(
          'startTime' => @rehearsal.start_time.strftime("%Y-%m-%d %H:%M:%S UTC"),
          'endTime' => @rehearsal.end_time.strftime("%Y-%m-%d %H:%M:%S UTC"),
        )

      end

      def production_rehearsals_query(production_id:)
        <<~GQL
          query {
            production (id: #{production_id}) {
              rehearsals {
                endTime
                space {
                  name
                }
                startTime
                users {
                  id
                }
              }
          }
        }
      GQL
      end

      def user_rehearsals_query(user_id:)
        <<~GQL
          query {
            user (id: #{user_id}) {
          }
        }
      GQL
      end

      def rehearsals_query
          <<~GQL
          query {
            rehearsals {
              startTime
              endTime
              notes
              production {
                id
              }
              space {
                name
              }
              title
            }
          }
        GQL
      end

      def rehearsal_query(id:)
        <<~GQL
          query {
            rehearsal (id: #{id}) {
            startTime
            endTime
            notes
            production {
              id
            }
            space {
              name
            }
            title
          }
        }
      GQL
      end
    end
  end
