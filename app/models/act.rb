class Act < ApplicationRecord
  belongs_to :play
  has_many :scenes, dependent: :destroy
  default_scope {order(:number)}

  validates :number, presence: true

  def pretty_name
    "Act #{self.number}"
  end

  def on_stages
    on_stages = []
    self.scenes.each do |scene|
      scene.french_scenes.each do |french_scene|
        on_stages << french_scene.on_stages
      end
    end
    on_stages.flatten!
    on_stages.uniq! {|o| o.character_id}
    return on_stages
  end

end
