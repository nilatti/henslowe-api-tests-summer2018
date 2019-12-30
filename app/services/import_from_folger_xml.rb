class ImportFromFolgerXmlFaster
  attr_accessor :acts, :characters, :current_act,
    :current_french_scene,
    :current_characters_on_stage,
    :current_scene,
    :dictionary,
    :french_scenes,
    :lines,
    :on_stages,
    :parsed_xml,
    :play,
    :scenes,
    :text_file

  def initialize(text_file)
    xml_doc = File.read(text_file) # for Folger Digital Texts, must remove the TEI tags at beginning and end
    @acts = []
    @characters = []
    @french_scenes = []
    @lines = []
    @on_stages = []
    @scenes = []
    @current_characters_on_stage = []
    @dictionary = {}
    @parsed_xml = Nokogiri::XML.parse(xml_doc)
    build_dictionary
    create_play
    # write_to_db
  end

  def add_value_to_dictionary(value)
    key = value.attr('xml:id')
    @dictionary[key] = value
  end

  def build_acts
    puts "building acts"
    @parsed_xml.xpath('//div1').each do |act|
      act_number = act.attr('n')
      @current_act = Act.create(act_number: act_number, play: @play)
      act.xpath('div2').each do |scene|
        build_scenes(act: @current_act, scene: scene)
      end
    end
  end


  def build_characters
    i = 1
    puts "building characters"
    @parsed_xml.xpath('//person').each do |person|
      name = person.xpath('persName').text
      remove_white_spaces(name)
      gender = person.xpath('sex').text
      remove_white_spaces(gender)
      description = person.xpath('state').text
      remove_white_spaces(description)
      xml_id = person.attr('xml:id')
      group_id = person.attr('corresp').sub(/#/, '') if person.attr('corresp')
      @characters << Character.new(name: name, description: description, gender: gender, group_id: group_id, xml_id: xml_id, play: @play)
    end
    @parsed_xml.xpath('//personGrp').each do |group|
      name = group.xpath('name').text || group.attr('xml:id')
      xml_id = "#{group.attr('xml:id')}-#{i}"
      name = group.xpath('persName').text || xml_id
      @characters << Character.new(name: name, xml_id: xml_id, play: @play)
      i += 1
    end
    Character.import @characters, :on_duplicate_key_ignore
    @characters = Character.where(play: @play)
  end

  def build_dictionary
    puts "building dictionary"
    @parsed_xml.xpath('//w').each do |value|
      add_value_to_dictionary(value)
    end
    @parsed_xml.xpath('//pc').each do |value|
      add_value_to_dictionary(value)
    end
    @parsed_xml.xpath('//c').each do |value|
      add_value_to_dictionary(value)
    end
  end

  def build_line(milestone, next_milestone = nil)
    puts "building lines"
    milestone_line = []
    line_pieces = milestone.attr('corresp').split(/ /)
    next_line = []
    if next_milestone && next_milestone.attr('rend') == 'turnunder'
      next_line_pieces = next_milestone.attr('corresp').split(/ /)
      next_line_pieces.each do |id|
        id.sub!(/#/, '')
        next_line << @dictionary[id].text
      end
      next_line[0] = " #{next_line[0]}"
    end
    line_pieces.each do |id|
      id.sub!(/#/, '')
      milestone_line << @dictionary[id].text
    end
    completed_line = milestone_line.flatten.join
    completed_line += next_line.join
    completed_line = remove_white_spaces(completed_line)
  end

  def build_scenes(act:, scene:)
    scene_number = scene.attr('n')
    @current_scene = Scene.create(scene_number: scene_number, act: act)
    @current_french_scene_number = 'a'
    @on_last_french_scene = false
    scene.children.each do |child|
      if child.matches?('stage')
        if scene.children.index(child) == scene.children.length - 2
          @on_last_french_scene = true
        end
        if child.attr('type') == 'mixed'
          unmix_stage_direction(stage: child)
          commit_lines
        elsif child.attr('xml:id')
          process_stage_direction(stage: child)
          commit_lines
        else
          puts 'no xml id found'
        end
      elsif child.matches?('sp')
        process_speech(speech: child, character: child.attr('who'))
        commit_lines
      end
    end
  end

  def commit_lines
    Line.import @lines
    @lines = []
    OnStage.import @on_stages
    @on_stages = []
  end

  def create_play
    puts "building play"
    author = Author.find_by(last_name: 'Shakespeare')
    canonical = true
    summary = @parsed_xml.xpath('//text//front//div[@type="synopsis"]').text
    text_notes = 'This text is derived from the Folger Digital Text Editions'
    title = @parsed_xml.xpath('//fileDesc//sourceDesc//listWit//witness//biblStruct//monogr//title').first.text
    @play = Play.create(author: author, canonical: canonical, summary: summary, text_notes: text_notes, title: title)
    build_characters
    build_acts
  end

  def find_characters(line:)
    puts "finding character"
    characters = []
    xml_id = line.attr('who').delete('#') if line.attr('who')
    characters = xml_id.split(' ') if xml_id
  end

  def increment_alphabet(letter)
    letter.next!
  end

  def organize_text(text:) # expects Nokogiri element that has children that contain text.
    puts "organizing text"
    words = text.children
    textual_array = words.map(&:text)
    text_string = textual_array.join
    remove_white_spaces(text_string)
  end

  def process_speech(character:, speech:) # #line: Nokogiri node object, character: xml_id string
    puts "processing speech"
    characters = [character.delete('#')] || find_characters(speech)
    speech.children.each do |child|
      if child.matches?('ab')
        process_line(characters: characters, speech: child)
      end
    end
  end

def process_line(characters:, speech:)
  puts "processing line"
  speech.children.each do |child|
    if child.matches?('stage')
      process_stage_direction(stage: child, characters: characters)
     elsif child.matches?('milestone')
      next_milestone = speech.xpath('milestone')[speech.xpath('milestone').index(child) + 1]
      next if child.attr('rend') == 'turnunder'
      next unless child.attr('xml:id') && child.attr('corresp')
      text = build_line(child)#, next_milestone)
        characters.each do |character_xml_id|
          if !character_xml_id.is_a? String
            puts character_xml_id
          end
          character = @characters.find {|character| character.xml_id == character_xml_id }
          if character
            new_line = Line.new(
              category: 'text',
              character: character,
              french_scene: @current_french_scene,
              line_number: child.attr('n') || '',
              text: text
            )
            @lines << new_line
          end
        end
      end
    end
  end

  def process_stage_direction(stage:, characters: nil) # stage: Nokogiri node object, characters: array of xml_id strings
    text = organize_text(text: stage)
    characters = if stage.attr('type') == 'delivery'
      characters
    else
      find_characters(line: stage)
    end
    if characters
      if stage.attr('type') == 'entrance' || stage.attr('type') == 'exit'
        unless @on_last_french_scene
          @current_french_scene = FrenchScene.create(french_scene_number: @current_french_scene_number, scene: @current_scene)
        end
        @current_french_scene_number = increment_alphabet(@current_french_scene.french_scene_number)
      end
          characters.each do |character_xml_id|
        if !character_xml_id.is_a? String

        end
        character = @characters.find {|character| character.xml_id == character_xml_id }
        if character
          new_line = Line.new(
            category: "stage direction: #{stage.attr('type')}",
            character: character,
            french_scene: @current_french_scene,
            line_number: stage.attr('n') || '',
            text: text
          )
          @lines << new_line
          if stage.attr('type') == 'entrance'
            @current_characters_on_stage << character
          end
          if stage.attr('type') == 'exit'
            @current_characters_on_stage.reject! {|character| character.xml_id == character_xml_id}
          end
        end
      end
    end
    if stage.attr('type') == 'entrance' || stage.attr('type') == 'exit'
      @current_characters_on_stage.uniq.each do |character_on_stage|
        @on_stages << OnStage.new(french_scene: @current_french_scene, character: character_on_stage)
      end
    end
  end

  def remove_white_spaces(line)
    line.gsub!(/\s+\./, '.')
    line.gsub!(/\s+\,/, ',')
    line.gsub!(/\s+/, ' ')
    line.gsub!(/^\s/, '')
    line.gsub!(/\s+$/, '')
    line.gsub!(/(\r\n|\r|\n)/, '')
    line.delete!("\n")
    line.delete!("\r")
    line
  end

  def unmix_stage_direction(stage:)
    stage.children.each do |stage_direction|
      next unless stage_direction.attr('xml:id') && stage_direction.attr('xml:id').match?(/^stg/)

      process_stage_direction(stage: stage_direction)
    end
  end
end
