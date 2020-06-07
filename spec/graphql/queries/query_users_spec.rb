require 'rails_helper'

# tk users has some kind of fundamental problem.

module Types
    RSpec.describe QueryType, type: :request do
      before(:all) do
        @user = create(:user)
        5.times {
          create(:user)
        }
      end
      it 'returns users' do
        post '/api/graphql', params: { query: users_query }
        json = JSON.parse(response.body)
        data = json['data']['users']
        expect(data.size).to eq(6)
        
        expect(data).to include(
          'firstName' => @user.first_name,
          # 'email' => @user.email,
          # 'encryptedPassword' => @user.encrypted_password,
          # 'middleName' => @user.middle_name,
          # 'lastName' => @user.last_name,
          # 'phoneNumber' => @user.phone_number,
          # 'birthdate' => @user.birthdate.strftime("%Y-%m-%d"),
          # 'timezone' => @user.timezone,
          # 'gender' => @user.gender,
          # 'bio' => @user.bio,
          # 'description' => @user.description,
          # 'streetAddress' => @user.street_address,
          # 'city' => @user.city,
          # 'state' => @user.state,
          # 'zip' => @user.zip,
          # 'website' => @user.website,
          # 'emergencyContactName' => @user.emergency_contact_name,
          # 'emergencyContactNumber' => @user.emergency_contact_number,
          # 'preferredName' => @user.preferred_name,
          # 'programName' => @user.program_name,
        )
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
              id
            }
          }
        GQL
      end
    end
  end
