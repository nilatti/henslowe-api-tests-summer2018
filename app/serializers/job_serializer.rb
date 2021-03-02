class JobSerializer
    include JSONAPI::Serializer
    attributes :start_date, :end_date
    belongs_to :character
    belongs_to :production
    belongs_to :specialization
    belongs_to :theater
    belongs_to :user
end