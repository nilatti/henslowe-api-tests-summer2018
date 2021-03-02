class StageDirectionSerializer
    include JSONAPI::Serializer
    attributes :xml_id, :number, :kind, :notes, :original_content, :new_content
    belongs_to :french_scene
  end