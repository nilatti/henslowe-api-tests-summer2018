class CharacterGroupSerializer
    include JSONAPI::Serializer
    attributes :name, :description, :xml_id, :corresp, :original_line_count, :new_line_count, :entrance_exits, :stage_directions
    belongs_to :play 
    has_many :jobs 
    has_many :on_stages 
    has_many :french_scenes 
    has_many :lines 
  end