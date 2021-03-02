class OnStageSerializer
    include JSONAPI::Serializer
    attributes :description, :category, :nonspeaking
    belongs_to :character
    belongs_to :character_group
    belongs_to :user
    belongs_to :french_scene

  end