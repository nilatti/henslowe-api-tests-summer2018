class Scene < ApplicationRecord
  belongs_to :act
  has_many :french_scenes, dependent: :destroy

  validates :number, presence: true

  default_scope {order(:number)}

  def pretty_name
    "#{self.act.number}.#{self.number}"
  end

  def on_stages
    on_stages = []
    self.french_scenes.each do |french_scene|
      on_stages << french_scene.on_stages
    end
    on_stages.flatten!
    on_stages.uniq! {|o| o.character_id}
    return on_stages
  end

end
