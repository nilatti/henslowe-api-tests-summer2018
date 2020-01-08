class CopyPlayForProduction
  attr_accessor :original_play, :production_id, :new_play
  def initialize(play_id:, production_id:)
    @original_play = Play.find(play_id)
    @production_id = production_id
  end

  def run
    create_play_copy(play: @original_play)
    CreateCastingForProduction.new(play_id: @new_play.id, production_id: production_id).create_castings
  end

  def create_play_copy(play:)
    @new_play = @original_play.dup
    @new_play.canonical = false
    @new_play.production_id = @production_id
    @new_play.original_play_id = @original_play.id
    @new_play.save!
    create_copies_of_each_character(original_play_characters: @original_play.characters, new_play: @new_play)
    create_copies_of_each_character_group(original_play_character_groups: @original_play.character_groups, new_play: @new_play)
    create_copies_of_each_act(original_play: @original_play, new_play: @new_play)
  end

  def create_copies_of_each_act(original_play:, new_play:)
    original_acts = original_play.acts
    original_acts.each do |original_act|
      new_act = original_act.dup
      new_act.play = new_play
      new_act.save!
      create_copies_of_each_scene(original_act: original_act, new_act: new_act)
    end
  end

  def create_copies_of_each_character(original_play_characters:, new_play:)
    original_play_characters.each do |original_character|
      new_character = original_character.dup
      new_character.play = new_play
      new_character.save!
    end
  end

  def create_copies_of_each_character_group(original_play_character_groups:, new_play:)
    original_play_character_groups.each do |original_character_group|
      new_character_group = original_character_group.dup
      new_character_group.play = new_play
      new_character_group.save!
    end
  end


  def create_copies_of_each_scene(original_act:, new_act:)
    original_scenes = original_act.scenes
    original_scenes.each do |original_scene|
      new_scene = original_scene.dup
      new_scene.act = new_act
      new_scene.save!
      create_copies_of_each_french_scene(original_scene: original_scene, new_scene: new_scene)
    end
  end
  def create_copies_of_each_french_scene(original_scene:, new_scene:)
    original_french_scenes = original_scene.french_scenes
    original_french_scenes.each do |original_french_scene|
      new_french_scene = original_french_scene.dup
      new_french_scene.scene = new_scene
      new_french_scene.save!
      create_copies_of_each_on_stage(original_french_scene: original_french_scene, new_french_scene: new_french_scene)
    end
  end
  def create_copies_of_each_on_stage(original_french_scene:, new_french_scene:)
    original_on_stages = original_french_scene.on_stages
    original_on_stages.each do |original_on_stage|
      new_on_stage = original_on_stage.dup
      new_on_stage.french_scene = new_french_scene
      if original_on_stage.character
        new_on_stage.character = Character.find_by(name: original_on_stage.character.name, play_id: @new_play.id)
      elsif original_on_stage.character_group
        new_on_stage.character_group = CharacterGroup.find_by(name: original_on_stage.character_group.name, play_id: @new_play.id)
      end
      new_on_stage.save!
    end
  end
end
