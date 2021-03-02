class SpecializationSerializer
    include JSONAPI::Serializer
    attributes :title, :description
    belongs_to :job
end