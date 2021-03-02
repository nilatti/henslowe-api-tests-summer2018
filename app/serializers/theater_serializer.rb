class TheaterSerializer
    include JSONAPI::Serializer
    attributes :name, :street_address, :city, :state, :zip, :phone_number, :mission_statement, :website, :calendar_url, :logo 
    has_many :productions 
    has_many :jobs
end