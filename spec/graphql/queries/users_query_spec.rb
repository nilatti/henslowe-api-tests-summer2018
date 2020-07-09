require 'rails_helper'

# tk users has some kind of fundamental problem.

module Types
    RSpec.describe QueryType, type: :request do
      before(:all) do
        @user = create(:user)

      end
      it 'returns users' do
        original_size = User.count
        post '/api/graphql', params: { query: users_query }
        json = JSON.parse(response.body)
        data = json['data']['users']
        expect(data.size).to eq(original_size)

      end

      it 'returns a user' do
        post '/api/graphql', params: { query: user_query(user_id: @user.id) }
        # puts @user.id
        json = JSON.parse(response.body)
        # puts json
        data = json['data']['user']
      end

      def users_query
          <<~GQL
          query {
            users {
              bio
              birthdate
              city
              description
              email
              emergencyContactName
              emergencyContactNumber
              encryptedPassword
              firstName
              gender
              id
              lastName
              middleName
              phoneNumber
              preferredName
              programName
              state
              streetAddress
              timezone
              website
              zip
            }
          }
        GQL
      end
      def user_query(user_id:)
          <<~GQL
          query {
            user(id: #{@user.id}) {
            bio
            birthdate
            city
            description
            email
            emergencyContactName
            emergencyContactNumber
            encryptedPassword
            firstName
            gender
            id
            lastName
            middleName
            phoneNumber
            preferredName
            programName
            state
            streetAddress
            timezone
            website
            zip
            }
          }
        GQL
      end
    end
  end
