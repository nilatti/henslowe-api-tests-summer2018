require 'rails_helper'

module Types
    RSpec.describe QueryType, type: :request do
      before(:all) do
        @play = create(:play)
      end
      it 'returns plays' do
        post '/api/graphql', params: { query: plays_query }
        json = JSON.parse(response.body)
        data = json['data']['plays']
        expect(data).to include(
          'canonical'=> @play.canonical,
          'date' => @play.date.strftime("%Y-%m-%d"),
          'genre' => @play.genre,
          'id' => be_present,
          'newLineCount' => @play.new_line_count,
          'originalLineCount' => @play.original_line_count,
          'synopsis' => @play.synopsis,
          'textNotes' => @play.text_notes,
          'title' => @play.title
        )
      end

      it 'returns a play' do
        post '/api/graphql', params: { query: play_query(id: @play.id) }
        json = JSON.parse(response.body)
        puts json
        data = json['data']['play']
        expect(data).to include(
          'canonical'=> @play.canonical,
          'date' => @play.date.strftime("%Y-%m-%d"),
          'genre' => @play.genre,
          'id' => be_present,
          'newLineCount' => @play.new_line_count,
          'originalLineCount' => @play.original_line_count,
          'synopsis' => @play.synopsis,
          'textNotes' => @play.text_notes,
          'title' => @play.title
        )
        expect(data['acts'].size).to eq(3)
        expect(data['acts'].first).to include(
          'id' => @play.acts.first.id.to_s,
          'endPage' => @play.acts.first.end_page,
          'heading' => @play.acts.first.heading,
          'number' => @play.acts.first.number,
          'startPage' => @play.acts.first.start_page,
          'summary' => @play.acts.first.summary,
        )
        expect(data['acts'].first['scenes'].size).to eq(3)
        expect(data['acts'].first['scenes'].first).to include(
          'endPage' => @play.acts.first.scenes.first.end_page,
          'heading' => @play.acts.first.scenes.first.heading,
          'id' => @play.acts.first.scenes.first.id.to_s,
          'number' => @play.acts.first.scenes.first.number,
          'startPage' => @play.acts.first.scenes.first.start_page,
          'summary' => @play.acts.first.scenes.first.summary,
        )
        expect(data['acts'].first['scenes'].first['frenchScenes'].size).to eq(3)
        expect(data['acts'].first['scenes'].first['frenchScenes'].first).to include(
          'endPage' => @play.acts.first.scenes.first.french_scenes.first.end_page,
          'id' => @play.acts.first.scenes.first.french_scenes.first.id.to_s,
          'number' => @play.acts.first.scenes.first.french_scenes.first.number,
          'startPage' => @play.acts.first.scenes.first.french_scenes.first.start_page,
          'summary' => @play.acts.first.scenes.first.french_scenes.first.summary,
        )
      end

      def plays_query
          <<~GQL
          query {
            plays {
              canonical
              date
              genre
              id
              newLineCount
              originalLineCount
              synopsis
              textNotes
              title
            }
          }
        GQL
      end

      def play_query(id:)
        <<~GQL
          query {
            play (id: #{id}) {
            canonical
            date
            genre
            id
            newLineCount
            originalLineCount
            synopsis
            textNotes
            title
            characters {
              id
              name
            }
            characterGroups {
              id
              name
            }
            acts {
              id
              endPage
              heading
              number
              rehearsals {
                id
              }
              scenes {
                endPage
                frenchScenes {
                  endPage
                  id
                  number
                  rehearsals {
                    id
                  }
                  startPage
                  summary
                }
                heading
                id
                number
                rehearsals {
                  id
                }
                startPage
                summary
              }
              summary
              startPage
            }
          }
        }
      GQL
      end
    end
  end
