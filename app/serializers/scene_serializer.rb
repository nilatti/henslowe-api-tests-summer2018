class SceneSerializer
    include JSONAPI::Serializer
    attributes :number, :summary, :end_page, :start_page, :heading, :original_line_count, :new_line_count, :rehearsals
    belongs_to :act
    has_many :french_scenes
    has_many :lines
    has_many :on_stages
    attribute :french_scenes do |scene|
        FrenchSceneSerializer.new(scene.french_scenes)
      end
end

