class ImportFromFolgerXmlAll
  attr_accessor :current_act,
    :current_character,
    :current_french_scene,
    :current_line,
    :current_scene,
    :play,
    :parsed_xml

  def initialize(text_file)
    xml_doc = File.read(text_file) # for Folger Digital Texts, must remove the TEI tags at beginning and end
    @parsed_xml = Nokogiri::XML.parse(xml_doc)
  end

  def run
    build_play
    build_characters(play: @play)
    build_acts
  end

  def build_acts(play:, parsed_xml: @parsed_xml)
    @parsed_xml.xpath('//div1').each do |act|
      if act.attr('type') === 'act'
        heading = build_header(item: act.at_xpath('head'))
        @current_act = Act.create(
          heading: heading,
          number: act.attr('n'),
          play: play
        )
        scenes = act.xpath('div2')
        scenes.each {|scene| build_scene(act: @current_act, scene: scene)}
      elsif act.attr('type') === 'scene'
        build_scene(@current_act, act)
      end
    end
    return @current_act
  end

  def build_character(character:, play:)
    if character.attr('corresp')
      corresp_string = character.attr('corresp').to_s.sub('#','')
      character_group = CharacterGroup.find_by(xml_id: corresp_string)
    end
    Character.create(
      character_group: character_group,
      corresp: character.attr('corresp'),
      description: character.xpath('state').text,
      gender: character.xpath('sex').text,
      name: character.xpath('persName/name').text,
      play: play,
      xml_id: character.attr('xml:id')
    )
  end

  def build_character_group(character_group:, play:)
    CharacterGroup.create(
      corresp: character_group.attr('corresp'),
      play_id: play.id,
      xml_id: character_group.attr('xml:id')
    )
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
      heading += piece
    end
    return heading
  end

  def build_line(character:, line:, french_scene:)
    @current_line = Line.create(
      ana: line.attr('ana'),
      character_id: character.id,
      corresp: line.attr('corresp'),
      french_scene_id: french_scene.id,
      number: line.attr('n'),
      kind: 'line',
      xml_id: line.attr('xml:id'),
    )
    return @current_line
  end

  def build_play
    synopsis = @parsed_xml.xpath('//div[@type="synopsis"]') || ''
    title = @parsed_xml.xpath('//titleStmt/title').text
    author = Author.find_by(last_name: 'Shakespeare') || ''
    text_notes = "Adapted from the Folger Digital Texts, edited by "
    editors = @parsed_xml.xpath('//titleStmt/editor').map(&:text).join(', ')
    text_notes += editors
    @play = Play.create(author: author, synopsis: synopsis, text_notes: text_notes, title: title)
  end

  def build_scene(act:, scene:)
    if scene.attr('type') === 'scene'
      scene_number = scene.attr('n')
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
  end

  def build_sound_cue(french_scene:, item:)
    content = extract_content(item: item)
    SoundCue.create(
      content: content,
      french_scene: french_scene,
      line_number: item.attr('n'),
      notes: item.attr('ana'),
      kind: item.attr('type'),
      xml_id: item.attr('xml:id')
    )
  end

  def build_speech(french_scene:, item:)
    if item.attr('who')
      xml_string = item.attr('who').sub('#','')
      @current_character = Character.find_by(xml_id: xml_string)
    end
  end

  def build_stage_direction(item:, french_scene:)
    character_parser = extract_characters_from_xml_id_string(xml_ids: item.attr('who')) #should return an array, first item is characters, second is character groups
    characters = character_parser[0]
    character_groups = character_parser[1]
    content = extract_content(item: item)
    StageDirection.create(
      characters: characters,
      character_groups: character_groups,
      content: content,
      french_scene: french_scene,
      number: item.attr('n'),
      kind: item.attr('type'),
      xml_id: item.attr('xml:id')
    )
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

    Word.create(
      content: word.text,
      line_number: word.attr('n'),
      kind: kind,
      xml_id: word.attr('xml:id')
    )
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
    elsif item.matches?('lb') || item.matches?('q') || item.matches?('foreign') || item.matches?('ab') || item.matches?('seg')||item.matches?('label') #all junk we don't need to track, just get the children.
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
      character = Character.find_by(xml_id: xml_id)
      if character
        characters << character
      else
        character_group = CharacterGroup.find_by(xml_id: xml_id)
        if character_group
          character_groups << character_group
        else
          puts "Couldn't find character #{xml_id}"
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
        content += child.text
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

  def verify_no_more_children(item)
    if item.children.select(&:element?).size == 0
      return true
    else
      return false
    end
  end
end
