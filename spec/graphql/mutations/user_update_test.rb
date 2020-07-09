require 'rails_helper'

module Mutations
  module Users
    RSpec.describe UserUpdate, type: :request do
      describe '.resolve' do
        before(:all) do
          @user = create(:user)
          @user_update = build(:user)
        end
        it 'updates a user' do
          post '/api/graphql', params: { query: user_query(user_id: @user.id) }
          expect(@user.reload).to have_attributes(
            bio: @user_update.bio,
            birthdate: @user_update.birthdate.strftime("%Y-%m-%d"),
            city: @user_update.city,
            description: @user_update.description,
            email: @user_update.email,
            emergencyContactName: @user_update.emergency_contact_name,
            emergencyContactNumber: @user_update.emergency_contact_number,
            firstName: @user_update.first_name,
            gender: @user_update.gender,
            lastName: @user_update.last_name,
            middleName: @user_update.middle_name,
            phoneNumber: @user_update.phone_number,
            preferredName: @user_update.preferred_name,
            programName: @user_update.program_name,
            state: @user_update.state,
            streetAddress: @user_update.street_address,
            timezone: @user_update.timezone,
            website: @user_update.website,
            zip: @user_update.zip
          )
        end

        it 'returns a user' do
          post '/api/graphql', params: { query: user_query(user_id: @user.id) }
          json = JSON.parse(response.body)
          print json
          data = json['data']['userUpdate']['user']

          expect(data).to include(

            'bio' => @user_update.bio,
            'birthdate' => @user_update.birthdate,
            'city' => @user_update.city,
            'description' => @user_update.description,
            'email' => @user_update.email,
            'emergencyContactName' => @user_update.emergency_contact_name,
            'emergencyContactNumber' => @user_update.emergency_contact_number,
            'firstName' => @user_update.first_name,
            'gender' => @user_update.gender,
            'lastName' => @user_update.last_name,
            'middleName' => @user_update.middle_name,
            'phoneNumber' => @user_update.phone_number,
            'preferredName' => @user_update.preferred_name,
            'programName' => @user_update.program_name,
            'state' => @user_update.state,
            'streetAddress' => @user_update.street_address,
            'timezone' => @user_update.timezone,
            'website' => @user_update.website,
            'zip' => @user_update.zip
          )
        end
      end

      def user_query(user_id:)
        <<~GQL
          mutation {
            userUpdate(input: {
              bio: "#{@user_update.bio}",
              birthdate: "#{@user_update.birthdate}",
              city: "#{@user_update.city}",
              description: "#{@user_update.description}",
              email: "#{@user_update.email}",
              emergencyContactName: "#{@user_update.emergency_contact_name}",
              emergencyContactNumber: "#{@user_update.emergency_contact_number}",
              firstName: "#{@user_update.first_name}",
              gender: "#{@user_update.gender}",
              id: "#{@user.id}"
              lastName: "#{@user_update.last_name}",
              middleName: "#{@user_update.middle_name}",
              phoneNumber: "#{@user_update.phone_number}",
              programName: "#{@user_update.program_name}",
              state: "#{@user_update.state}",
              streetAddress: "#{@user_update.street_address}",
              timezone: "#{@user_update.timezone}",
              website: "#{@user_update.website}",
              zip: "#{@user_update.zip}"
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
