# before importing, you must remove the TEI tags from the xml document and replace them with <root> tags. Also, make a character called "Could Not Find Character" with xml_id: "CouldNotFindCharacter" in the xml document

class ImportFromFolgerXmlAll
  attr_accessor :characters,
    :character_groups,
    :current_act,
    :current_character,
    :current_characters_onstage,
    :current_french_scene,
    :current_scene,
    :lines,
    :on_stages,
    :play,
    :parsed_xml,
    :stage_directions,
    :updated_words,
    :words

  def initialize(text_file)
    xml_doc = File.read(text_file) # for Folger Digital Texts, must remove the TEI tags at beginning and end
    @parsed_xml = Nokogiri::XML.parse(xml_doc)
    @characters = []
    @character_groups = []
    @current_character = []
    @current_characters_onstage = []
    @lines = []
    @on_stages = []
    @stage_directions = []
    @updated_words = []
    @words = []
  end

  def run
    puts "started run at #{Time.current()}"
    build_play
    build_characters(play: @play)
    puts "finished building characters at #{Time.current()}"
    character_imports = Character.import @characters
    puts character_imports.failed_instances
    puts character_imports.num_inserts
    character_group_imports = CharacterGroup.import @character_groups
    puts character_group_imports.failed_instances
    puts character_group_imports.num_inserts
    puts "now do more things"
    build_acts(play: @play, parsed_xml: @parsed_xml)
    puts "line size is #{@play.lines.size}"
    puts "total lines before import #{Line.all.size}"
    line_imports = Line.import @lines
    puts line.failed_instances
    puts line.num_inserts
    puts "total lines after import #{Line.all.size}"
    stage_direction_imports = StageDirection.import @stage_directions
    puts stage_direction_imports.failed_instances
    puts stage_direction_imports.num_inserts
    on_stage_imports = OnStage.import @on_stages
    puts on_stage_imports.failed_instances
    puts on_stage_imports.num_inserts
    word_imports = Word.import @words
    puts word_imports.failed_instances
    puts word_imports.num_inserts
    puts "lines in play are #{@play.lines.size}"
    puts @play.id
    puts Time.current
    # connect_lines_to_words(lines: @play.lines, words: @play.words)
  end

  def build_acts(play:, parsed_xml:)
    puts "build acts called"
    parsed_xml.xpath('//div1').each do |act|
      puts "building act #{act.attr('xml:id')}"
      if act.attr('type') === 'act'
        heading = build_header(item: act.at_xpath('head'))
        puts "building #{heading} at #{Time.current}"
        @current_act = Act.create(
          heading: heading,
          number: act.attr('n'),
          play_id: play.id
        )
        scenes = act.xpath('div2')
        scenes.each do |scene|
          if scene.attr('type') === 'epilogue'
            @current_act = Act.create(
              heading: 'EPILOGUE',
              number: 6,
              play_id: play.id
            )
          elsif scene.attr('type') === 'prologue'
            @current_act = Act.create(
              heading: 'PROLOGUE',
              number: 0,
              play_id: play.id
            )
          end
          build_scene(act: @current_act, scene: scene)
        end
      end
    end
    return @current_act
  end

  def build_character(character:, play:)
    if character.attr('corresp')
      corresp_string = character.attr('corresp').to_s.sub('#','')
      character_group = CharacterGroup.find_by(xml_id: corresp_string)
    end
    puts "character is #{character.attr('xml:id')}"
    character = Character.new(
      character_group: character_group,
      corresp: character.attr('corresp'),
      description: character.xpath('state').text,
      gender: character.xpath('sex').text,
      name: character.xpath('persName/name').text,
      play_id: play.id,
      xml_id: character.attr('xml:id')
    )
    @characters << character
    return character
  end

  def build_character_group(character_group:, play:)
    character_group = CharacterGroup.new(
      corresp: character_group.attr('corresp'),
      play_id: play.id,
      xml_id: character_group.attr('xml:id')
    )
    @character_groups << character_group
    return character_group
  end

  def build_characters(play:)
    character_groups = @parsed_xml.xpath('//personGrp')
    character_groups.each {|character_group| build_character_group(character_group: character_group, play: play)}
    characters = @parsed_xml.xpath('//person')
    characters.each{|character| build_character(character: character, play: play)}
  end

  def build_french_scene(french_scene_number:, scene:)
    @current_french_scene = FrenchScene.create(
      number: french_scene_number,
      scene: scene
    )
  end

  def build_header(item:)
    heading = ''
    item.children.map(&:text).each do |piece|
      piece.chomp!
      heading << piece
    end
    return heading
  end

  def build_line(character:, line:, french_scene:) #expects array of characters
    new_line = ''
    if line.attr('ana')
      character.each do |char|
        ana = line.attr('ana') || ''
        corresp = line.attr('corresp') || ''
        number = line.attr('n') || ''
        xml_id = line.attr('xml:id') || ''
        new_line = Line.new(
          ana: ana,
          character_id: char.id,
          corresp: corresp,
          french_scene_id: french_scene.id,
          number: number,
          kind: 'line',
          xml_id: xml_id,
        )
        @lines << new_line
      end
    else
      puts "this didn't have an attr #{line}"
    end
    return new_line
  end

  def build_play
    synopsis = @parsed_xml.xpath('//div[@type="synopsis"]') || ''
    title = @parsed_xml.xpath('//titleStmt/title').text
    author = Author.find_by(last_name: 'Shakespeare') || ''
    text_notes = "Adapted from the Folger Digital Texts, edited by "
    editors = @parsed_xml.xpath('//titleStmt/editor').map(&:text).join(', ')
    text_notes << editors
    @play = Play.create(author: author, canonical: true, synopsis: synopsis, text_notes: text_notes, title: title)
  end

  def build_scene(act:, scene:)
    scene_number = scene.attr('n') || 0
    heading = build_header(item: scene.at_xpath('head'))
    @current_scene = Scene.create(
      act: act,
      heading: heading,
      number: scene_number
    )
    build_french_scene(french_scene_number: 'a', scene: @current_scene)
    stage_directions = [] #need to grab all stage directions so that we don't make extra french scenes. The scene autocreates the first french scene and we don't want one made from the final exit.
    scene.traverse do |node|
      if node.matches?('stage')
        stage_directions << node
      end
    end
    scene.children.select(&:element?).each do |item|
      if item.matches?('stage')
        if (item != stage_directions.first && item != stage_directions.last) && (item.attr('type') === 'entrance' || item.attr('type') === 'exit') #if it's not the first or last entrance or exit, let's make a french scene!
          build_french_scene(french_scene_number: @current_french_scene.number.next, scene: @current_scene)
        end
      end
      process_item(item)
    end
    return @current_scene
  end

  def build_on_stages(french_scene:, characters:) #expect characters from parser, so [0] = characters, [1] = character groups
    characters.flatten!(3)
    characters.uniq!
    characters.each do |char|
      if char.is_a? Character
        @on_stages << OnStage.new(french_scene: french_scene, character: char, category: 'Character')
      elsif char.is_a? CharacterGroup
        @on_stages << OnStage.new(french_scene: french_scene, character_group: char, category: 'Character')
      end
    end
    return @on_stages
  end

  def build_sound_cue(french_scene:, item:)
    content = extract_content(item: item)
    SoundCue.create(
      content: content,
      french_scene_id: french_scene.id,
      line_number: item.attr('n'),
      notes: item.attr('ana'),
      kind: item.attr('type'),
      xml_id: item.attr('xml:id')
    )
  end

  def build_speech(french_scene:, item:)
    @current_character = []
    character_parser = extract_characters_from_xml_id_string(xml_ids: item.attr('who'))
    @current_character = character_parser.flatten!(3)

  end

  def build_stage_direction(item:, french_scene:)
    character_parser = extract_characters_from_xml_id_string(xml_ids: item.attr('who')) #should return an array, first item is characters, second is character groups
    characters = character_parser[0]
    character_groups = character_parser[1]
    content = extract_content(item: item)
    if item.attr('type') == 'entrance' || item.attr('type') == 'exit'
      track_onstage_characters(french_scene: @current_french_scene, stage_direction: item, characters: characters, character_groups: character_groups)
    end
    stage_direction = StageDirection.new(
      characters: characters,
      character_groups: character_groups,
      content: content,
      french_scene_id: french_scene.id,
      number: item.attr('n'),
      kind: item.attr('type'),
      xml_id: item.attr('xml:id')
    )
    @stage_directions << stage_direction
    return stage_direction
  end

  def build_word(word:)
    kind = ''
    if word.matches?('w')
      kind = 'word'
    elsif word.matches?('pc')
      kind = 'punctuation'
    elsif word.matches?('c')
      kind = 'space'
    end
    new_word = Word.new(
      content: word.text,
      line_number: word.attr('n'),
      kind: kind,
      play_id: @play.id,
      xml_id: word.attr('xml:id')
    )
    @words << new_word
    return new_word
  end

  def connect_lines_to_words(play:)
    lines = play.lines
    words = play.words.to_set
    lines.each {|l| puts "#{l.xml_id}\t#{l.number}"}
    words.each {|w| puts "#{w.play_id}\t#{w.xml_id}\t#{w.line_number}" }
    lines.each do |line|
      line_arr = line.corresp.to_s.split(' ')
      line_arr.each do |xml_id|
        xml_id.sub!('#', '')
        word = words.find {|w| w.xml_id == xml_id}
        if word
          updated_word = {
            created_at: word.created_at,
            content: word.content,
            id: word.id,
            kind: word.kind,
            line_id: line.id,
            line_number: line.number,
            play_id: word.play_id,
            xml_id: word.xml_id,
            updated_at: word.updated_at,
          }
          @updated_words << updated_word
        else
          puts "cant find this word: #{xml_id}"
        end
      end
    end
    Word.upsert_all(@updated_words)
  end

  def determine_type_of_item(french_scene:, item:)
    if item.matches?('sp')
      build_speech(french_scene: @current_french_scene, item: item)
    elsif item.matches?('stage')
      build_stage_direction(french_scene: @current_french_scene, item: item)
    elsif item.matches?('sound')
      build_sound_cue(french_scene: @current_french_scene, item: item)
    elsif item.matches?('head')
      build_header(item: item)
  elsif item.matches?('milestone') && (item.attr('unit') === 'ftln' || item.attr('unit') === 'line')
      build_line(character: @current_character, french_scene: @current_french_scene, line: item)
    elsif item.matches?('w') || item.matches?('c') || item.matches?('pc') || item.matches?('speaker')
      build_word(word: item)
    elsif item.matches?('lb') || item.matches?('q') || item.matches?('foreign') || item.matches?('ab') ||     item.matches?('seg')||item.matches?('label') #all junk we don't need to track, just get the children.
    else
      puts "couldn't match item #{item}"
    end
  end

  def extract_characters_from_xml_id_string(xml_ids:)
    characters = []
    character_groups = []
    xml_id_arr = xml_ids.to_s.split(' ')
    xml_id_arr.each do |xml_id|
      xml_id.sub!('#', '')
      character = Character.find_by(xml_id: xml_id, play_id: @play.id)
      if character
        characters << character
      else
        character_group = CharacterGroup.find_by(xml_id: xml_id, play_id: @play.id)
        if character_group
          character_groups << character_group
        else
          puts "Could not find character #{xml_id}"
          characters << Character.find_by(xml_id: 'CouldNotFindCharacter')
        end
      end
    end
    character_parser = [characters, character_groups]
    return character_parser
  end

  def extract_content(item:)
    content = ''
    item.children.each do |child|
      if child.matches?('w') || child.matches?('pc') || child.matches?('c')
        content << child.text
      end
    end
    content
  end

  def extract_items_from_corresp(corresp)
    corresp_arr = corresp.to_s.split(' ')
    corresp_arr.each do |corresp|
      corresp.sub!('#', '')
      xml_word = @parsed_xml.at_xpath("//*[@xml:id=\"#{corresp}\"]")
    end
  end

  def process_item(item)
    determine_type_of_item(french_scene: @current_french_scene, item: item)
    if verify_no_more_children(item)
      return
    else
      item.children.select(&:element?).each {|child| process_item(child)}
    end
  end

  def track_onstage_characters(french_scene:, stage_direction:, characters:, character_groups:)
    puts "current french scene is #{@current_act.number}.#{@current_scene.number}.#{@current_french_scene.number}"
    puts "stage direction is #{stage_direction}"

    @current_characters_onstage.size
    if stage_direction.attr('type') == 'entrance'
      @current_characters_onstage << characters
      @current_characters_onstage << character_groups
    elsif stage_direction.attr('type') == 'exit'
      all_characters = characters.concat(character_groups)
      all_characters.flatten!(2)
      all_characters.uniq!
      all_characters.each {|char| @current_characters_onstage.delete(char)}
    end
    @current_characters_onstage.uniq!
    build_on_stages(french_scene: french_scene, characters: @current_characters_onstage)
  end

  def verify_no_more_children(item)
    if item.children.select(&:element?).size == 0
      return true
    else
      return false
    end
  end
end
