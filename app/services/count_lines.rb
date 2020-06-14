class CountLines
  attr_reader :lines, :updated_lines
  def initialize(line_id: nil, lines: nil, play: nil)
    @characters = []
    @character_groups = []
    @lines = lines
    @line_id = line_id
    @updated_lines = []
    if play
      @play = play
    else
      @play = @line.play
    end
  end

  def run
    if @line_id
      @line = Line.find(@line_id)
    end
    get_line_lengths(lines: @lines)
    import_line_counts(updated_lines: @updated_lines)
    @characters = get_characters(lines: @lines)
    @character_groups = get_character_groups(lines: @lines)
    update_characters(characters: @characters)
    update_character_groups(character_groups: @character_groups)
    if @play
      update_play(play: @play)
    end
  end

  def get_characters(lines:)
    characters = []
    lines.each {|line| characters << line.character if line.character}
    return characters.uniq
  end

  def get_character_groups(lines:)
    character_groups = []
    lines.each {|line| character_groups << line.character_group if line.character_group }
    return character_groups.uniq
  end

  def get_line_lengths(lines:)
    line_length = 10.00 #because Shakespeare has a ten-syllable line
    updated_lines = []
    lines.each do |line|
      original_content_syllables = line.original_content.count_syllables
      if line.new_content
        new_content_syllables = line.new_content.count_syllables
        new_line_count = new_content_syllables / line_length
      end
      original_line_count = original_content_syllables / line_length
      line_attrs = {
        original_line_count: original_line_count,
        new_line_count: new_line_count ? new_line_count : original_line_count,
        ana: line.ana,
        character_id: line.character_id,
        character_group_id: line.character_group_id,
        corresp: line.corresp,
        created_at: line.created_at,
        french_scene_id: line.french_scene_id,
        id: line.id,
        kind: line.kind,
        new_content: line.new_content,
        next: line.next,
        number: line.number,
        original_content: line.original_content,
        prev: line.prev,
        updated_at: Time.now,
        xml_id: line.xml_id,
      }
      @updated_lines << line_attrs
    end
    return @updated_lines
  end

  def import_line_counts(updated_lines:)
    begin Line.upsert_all(updated_lines)
    rescue
      print 'problem upserting lines'
    end
  end

  def update_characters(characters:)
    characters.each do |character|
      character.original_line_count = character.lines.all.reduce(0) {|sum, line| line.original_line_count ? sum + line.original_line_count : 0}
      character.new_line_count = character.lines.all.reduce(0) {|sum, line| line.new_line_count ? sum + line.new_line_count : 0 }
      character.save
    end
  end

  def update_character_groups(character_groups:)
    character_groups.each do |character_group|
      character_group.original_line_count = character_group.lines.all.reduce(0) {|sum, line| line.original_line_count ? sum + line.original_line_count : 0}
      character_group.new_line_count = character_group.lines.all.reduce(0) {|sum, line| line.new_line_count ? sum + line.new_line_count : 0 }
      character_group.save
    end
  end

  def update_act(act:)
    act.original_line_count = act.lines.all.reduce(0) {|sum, line| line.original_line_count ? sum + line.original_line_count : 0}
    act.new_line_count = act.lines.all.reduce(0) {|sum, line| line.new_line_count ? sum + line.new_line_count : 0 }
    act.save
    act.scenes.each {|scene| update_scene(scene: scene)}
  end

  def update_french_scene(french_scene:)
    french_scene.original_line_count = french_scene.lines.all.reduce(0) {|sum, line| line.original_line_count ? sum + line.original_line_count : 0}
    french_scene.new_line_count = french_scene.lines.all.reduce(0) {|sum, line| line.new_line_count ? sum + line.new_line_count : 0 }
    french_scene.save
  end

  def update_play(play:)
    play.original_line_count = play.lines.all.reduce(0) {|sum, line| line.original_line_count ? sum + line.original_line_count : 0}
    play.new_line_count = play.lines.all.reduce(0) {|sum, line| line.new_line_count ? sum + line.new_line_count : 0 }
    play.save
    play.acts.each {|act| update_act(act: act)}
  end

  def update_scene(scene:)
    scene.original_line_count = scene.lines.all.reduce(0) {|sum, line| line.original_line_count ? sum + line.original_line_count : 0}
    scene.new_line_count = scene.lines.all.reduce(0) {|sum, line| line.new_line_count ? sum + line.new_line_count : 0 }
    scene.save
    scene.french_scenes.each {|french_scene| update_french_scene(french_scene: french_scene)}
  end
end
