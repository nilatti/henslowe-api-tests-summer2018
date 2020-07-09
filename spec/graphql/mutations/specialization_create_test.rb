require 'rails_helper'

module Mutations
  module Specializations
    RSpec.describe SpecializationCreate, type: :request do
      describe '.resolve' do
        before(:all) do
          @specialization = build(:specialization)
        end
        it 'creates a specialization' do
          expect do
            post '/api/graphql', params: { query: specialization_query }
          end.to change {Specialization.count }.by(1)
        end

        it 'returns a specialization' do
          post '/api/graphql', params: { query: specialization_query }
          json = JSON.parse(response.body)
          data = json['data']['createSpecialization']['specialization']

          expect(data).to include(
            'description' => @specialization.description,
            'title' => @specialization.title
          )
        end
      end

      def specialization_query
        <<~GQL
          mutation {
            specializationCreate(input: {
              description: "#{@specialization.description}",
              title: "#{@specialization.title}"
            }
            ) {
              specialization {
                description
                title
              }
            }
          }
        GQL
      end
    end
  end
end
