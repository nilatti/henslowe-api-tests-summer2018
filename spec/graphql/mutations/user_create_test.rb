require 'rails_helper'

module Mutations
  module Users
    RSpec.describe UserCreate, type: :request do
      describe '.resolve' do
        before(:all) do
          @user = build(:user)
        end
        it 'creates a user' do
          expect do
            post '/api/graphql', params: { query: user_query }
          end.to change {User.count }.by(1)
        end

        it 'returns a user' do
          post '/api/graphql', params: { query: user_query }
          json = JSON.parse(response.body)
          # puts json
          puts response.errors
          data = json['data']['createUser']['user']

          expect(data).to include(
            'bio' => @user.bio,
            'birthdate' => @user.birthdate.strftime("%Y-%m-%d"),
            'city' => @user.city,
            'description' => @user.description,
            'email' => @user.email,
            'emergencyContactName' => @user.emergency_contact_name,
            'emergencyContactNumber' => @user.emergency_contact_number,
            'firstName' => @user.first_name,
            'gender' => @user.gender,
            'lastName' => @user.last_name,
            'middleName' => @user.middle_name,
            'phoneNumber' => @user.phone_number,
            'preferredName' => @user.preferred_name,
            'programName' => @user.program_name,
            'state' => @user.state,
            'streetAddress' => @user.street_address,
            'timezone' => @user.timezone,
            'website' => @user.website,
            'zip' => @user.zip,
          )
        end
      end

      def user_query
        <<~GQL
          mutation {
            userCreate(input: {
              bio: "#{@user.bio}",
              birthdate: "#{@user.birthdate}",
              city: "#{@user.city}",
              description: "#{@user.description}",
              email: "#{@user.email}",
              emergencyContactName: "#{@user.emergency_contact_name}",
              emergencyContactNumber: "#{@user.emergency_contact_number}",
              firstName: "#{@user.first_name}",
              gender: "#{@user.gender}",
              lastName: "#{@user.last_name}",
              middleName: "#{@user.middle_name}",
              phoneNumber: "#{@user.phone_number}",
              preferredName: "#{@user.preferred_name}",
              programName: "#{@user.program_name}",
              state: "#{@user.state}",
              streetAddress: "#{@user.street_address}",
              timezone: "#{@user.timezone}",
              website: "#{@user.website}",
              zip: "#{@user.zip}"
            }
            ) {
              user {
                bio
                birthdate
                city
                description
                email
                emergencyContactName
                emergencyContactNumber
                firstName
                gender
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
          }
        GQL
      end
    end
  end
end
