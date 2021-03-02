class LineSerializer
    include JSONAPI::Serializer
    attributes :ana, :corresp, :next, :number, :prev, :kind, :xml_id, :original_content, :new_content, :original_line_count, :new_line_count
    belongs_to :character
    belongs_to :character_group
    belongs_to :french_scene
    has_many :words
  end

  