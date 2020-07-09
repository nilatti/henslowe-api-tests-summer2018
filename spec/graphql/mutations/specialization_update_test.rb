require 'rails_helper'

module Mutations
  module Specializations
    RSpec.describe SpecializationUpdate, type: :request do
      describe '.resolve' do
        before(:all) do
          @specialization = create(:specialization)
          @specialization_update = build(:specialization)
        end
        it 'updates a specialization' do
          post '/api/graphql', params: { query: specialization_query(specialization_id: @specialization.id) }
          expect(@specialization.reload).to have_attributes(
            description: @specialization_update.description,
            title: @specialization_update.title,
          )
        end

        it 'returns a specialization' do
          post '/api/graphql', params: { query: specialization_query(specialization_id: @specialization.id) }
          json = JSON.parse(response.body)
          data = json['data']['updateSpecialization']['specialization']

          expect(data).to include(
            'description' => @specialization_update.description,
            'title' => @specialization_update.title
          )
        end
      end

      def specialization_query(specialization_id:)
        <<~GQL
          mutation {
            specializationUpdate(input: {
              description: "#{@specialization_update.description}",
              id: #{@specialization.id}
              title: "#{@specialization_update.title}"
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
