class UserSerializer
    include JSONAPI::Serializer
    has_many :conflicts
    has_many :entrance_exits
    has_many :jobs
    has_many :characters
    has_many :on_stages
    has_many :french_scenes
    has_many :productions
    has_many :theaters
    has_many :specializations
end