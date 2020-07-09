require 'rails_helper'

module Types
    RSpec.describe QueryType, type: :request do
      before(:all) do
        @production = create(:production, :play_needed)
        @user = create(:user)
        @specialization = create(:specialization)
        @character = create(:character, play: @production.play)
        @job = create(:job, user: @user, specialization: @specialization, character: @character, production: @production, theater: @production.theater)
      end
      it 'returns productions' do
        post '/api/graphql', params: { query: productions_query }
        json = JSON.parse(response.body)
        data = json['data']['productions']
        expect(data).to include(
          'startDate' => @production.start_date.strftime("%Y-%m-%d"),
          'endDate' => @production.end_date.strftime("%Y-%m-%d"),
          'linesPerMinute' => @production.lines_per_minute,
        )
      end

      it 'returns a production' do
        post '/api/graphql', params: { query: production_query(id: @production.id) }
        json = JSON.parse(response.body)
        puts(json)
        data = json['data']['production']
        expect(data).to include(
          'startDate' => @production.start_date.strftime("%Y-%m-%d"),
          'endDate' => @production.end_date.strftime("%Y-%m-%d"),
          'linesPerMinute' => @production.lines_per_minute
        )
        expect(data['play']['title']).to eq(@production.play.title)
        expect(data['theater']['name']).to eq(@production.theater.name)
        expect(data['jobs'].first['character']['name']).to eq(@character.name)
        expect(data['jobs'].first['specialization']['title']).to eq(@specialization.title)
        expect(data['jobs'].first['theater']['name']).to eq(@production.theater.name)
        expect(data['jobs'].first['user']['id']).to eq(@user.id.to_s)
        expect(data['jobs'].first['startDate']).to eq(@job.start_date.strftime("%Y-%m-%d"))
      end

      def productions_query
          <<~GQL
          query {
            productions {
              startDate
              endDate
              linesPerMinute
            }
          }
        GQL
      end

      def production_query(id:)
        <<~GQL
          query {
            production (id: #{id}) {
              endDate
              id
              linesPerMinute
              startDate
              play {
                id
                title
              }
              theater {
                id
                name
              }
              jobs {
                character {
                  id
                  name
                }
                endDate
                id
                specialization {
                  id
                  title
                }
                startDate
                theater {
                  id
                  name
                }
                user {
                  id
                  firstName
                }
              }
          }
        }
      GQL
      end
    end
  end
