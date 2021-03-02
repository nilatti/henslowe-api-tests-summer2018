class WordSerializer
    include JSONAPI::Serializer
    attributes :kind, :content, :xml_id, :line_id, :line_number
    belongs_to :line
    belongs_to :play
  end
  
  