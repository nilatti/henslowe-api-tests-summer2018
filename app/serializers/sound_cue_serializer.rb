class SoundCueSerializer
    include JSONAPI::Serializer
    attributes :xml_id, :line_number, :kind, :notes, :original_content, :new_content
    belongs_to :french_scene
  end