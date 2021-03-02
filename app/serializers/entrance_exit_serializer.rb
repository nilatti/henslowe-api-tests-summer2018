class EntranceExitSerializer
    include JSONAPI::Serializer
    attributes :characters, :character_groups, :page, :line, :order, :category, :notes
    belongs_to :french_scene
    belongs_to :stage_exit
    belongs_to :user
  end

  