require 'rails_helper'

module Mutations
  module Authors
    RSpec.describe AuthorDestroy, type: :request do
      describe '.resolve' do
        before(:all) do
          @author = create(:author)
        end
        it 'destroys an author' do
          orig_count = Author.count
          Author.all.each {|a| puts "#{a.id}\t#{a.first_name}"}
          post '/api/graphql', params: { query: author_query }
          Author.all.each {|a| puts "#{a.id}\t#{a.first_name}"}
          expect(Author.count).to eq(orig_count - 1)
        end
      end

      def author_query
        <<~GQL
        mutation {
          authorDestroy(input: {id: @author.id}) {
             author {
               id
             }
           }
         }
        GQL
      end
    end
  end
end
