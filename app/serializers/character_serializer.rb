class CharacterSerializer
    include JSONAPI::Serializer
    attributes :name, :age, :gender, :description, :xml_id, :corresp, :character_group_id, :original_line_count, :new_line_count, :entrance_exits, :stage_directions
    belongs_to :play 
    belongs_to :character_group 
    has_many :jobs 
    has_many :on_stages 
    has_many :french_scenes 
    has_many :lines 
  end