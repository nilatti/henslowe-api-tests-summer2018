class ImportFromFolgerXmlAll
  attr_accessor :current_act,
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
    puts "called"
    @parsed_xml.xpath('//div1').each do |act|
      puts "called to build act"
      if act.attr('type') === 'act'
        puts "called to build a definite act"
        heading = ''
        act_header = act.at_xpath('head')
        act_header.children.map(&:text).each do |piece|
          piece.chomp!
          heading += piece
        end
        "here's the heading even #{heading}"
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

  def build_label(french_scene:, item:)
    content = ''
    item.children.each do |child|
      child.chomp!
      content += child
    end
    Label.create(
      content: content,
      french_scene: french_scene,
      line_number: item.attr('n'),
      xml_id: item.attr('xml:id')
    )
  end
  #
  # def build_line(character:, line:, french_scene:)
  #   @current_line = Line.create(
  #     ana: line.attr('ana'),
  #     character: character,
  #     corresp: line.attr('corresp'),
  #     french_scene: french_scene,
  #     number: line.attr('n'),
  #     kind: 'line',
  #     xml_id: line.attr('xml:id'),
  #   )
  # end
  #
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
      heading = ''
      scene_header = scene.at_xpath('head')
      scene_header.children.map(&:text).each do |piece|
        piece.chomp!
        heading += piece
      end
      @current_scene = Scene.create(
        act: act,
        heading: heading,
        number: scene_number
      )
      build_french_scene(french_scene_number: 'a', scene: @current_scene)
      scene.children.each do |item|
        # get if first build new french scene. Maybe pass is first child/is last child
        if item.matches?('stage')
          if scene.children.index(item) != scene.children.size && (item.attr('type') === 'entrance' || item.attr('type') === 'exit')
            build_french_scene(french_scene_number: @current_french_scene.number.next, scene: @current_scene)
          end
          build_stage_direction(line: item, french_scene: @current_french_scene)
        elsif item.matches?('sp')
          build_speech(french_scene: @current_french_scene, item: item)
        elsif item.matches?('sound')
          build_sound_cue(french_scene: @current_french_scene, item: item)
        elsif item.matches?('label')
          build_label(french_scene: @current_french_scene, item: item)
        end
      end
    end
  end
  #
  # def build_sound_cue(french_scene:, item:)
  #   SoundCue.create(
  #     french_scene: french_scene,
  #     line_number: item.attr('n'),
  #     notes: item.attr('ana'),
  #     kind: item.attr('type'),
  #     xml_id: item.attr('xml:id')
  #   )
  # end
  # def build_speech(french_scene:, item:)
  #   item = @parsed_xml.xpath('//sp').first
  #   character = ''
  #   if item.attr('who')
  #     xml_string = item.attr('who').sub('#','')
  #     character = Character.find_by(xml_id: xml_string)
  #     puts "character is"
  #   end
  #   item.xpath('//stage').each {|stage_direction| build_stage_direction(line: stage_direction, french_scene: @current_french_scene)}
  #
  #   speech_text = item.xpath('ab')
  #   speech_text.each do |text|
  #     if text.matches?('seg') do |segment|
  #       segment.children.each do |text|
  #         if text.matches('milestone') && text.attr('unit') === 'ftln'
  #           handle_milestone(character: character, milestone: text)
  #         elsif text.matches?('seg') do |segment|
  #           if text.matches('milestone') && text.attr('unit') === 'ftln'
  #             handle_milestone(character: character, milestone: text)
  #           else
  #             puts "couldn't match this one #{text.attr('xml:id')}"
  #           end
  #         end
  #       end
  #     end
  #     if text.matches?('milestone') && text.attr('unit') === 'ftln'
  #       handle_milestone(character: character, milestone: text)
  #     elsif text.matches?('w') || text.matches?('pc') || text.matches?('c')
  #       build_word(line: @current_line, word: text)
  #     elsif text.matches?('q') || text.matches?('foreign')
  #       text.children.each do |quoted|
  #         if quoted.matches?('w') || quoted.matches?('pc') || quoted.matches?('c')
  #           build_word(line: @current_line, word: text)
  #         end
  #       end
  #     end
  #   end
  # end
  #
  def build_stage_direction(line:, french_scene:)
    character = Character.find_by(xml_id: line.attr('who'))
    @current_line = Line.create(
      character: character,
      french_scene: french_scene,
      number: line.attr('n'),
      kind: line.attr('type'),
      xml_id: line.attr('xml:id')
    )
    line.children.each {|word| build_word(line: @current_line, word: word)}
  end

  def build_word(line:, word:)
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
      line_id: line.id,
      line_number: word.attr('n'),
      kind: kind,
      xml_id: word.attr('xml:id')
    )
  end
  #
  # def handle_milestone(character:, milestone:)
  #   if milestone.attr('rend') === 'turnunder'
  #     @current_line.corresp += milestone.attr('corresp')
  #   else
  #     build_line(character, milestone, @current_french_scene)
  #   end
  # end
end
