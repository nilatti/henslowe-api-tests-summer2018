require 'rails_helper'

describe ImportFromFolgerXmlAll do
  before(:all) do
    @import = ImportFromFolgerXmlAll.new('spec/data/folger_test.xml')
    create(:author, last_name: 'Shakespeare')
    @play = @import.build_play
    @xml = @import.parsed_xml
    create(:character, name: 'Adam', xml_id: 'Adam_AYL')
    create(:character, xml_id: "Celia_AYL")
    create(:character, xml_id: 'Charles_AYL')
    create(:character, xml_id: 'DukeFrederick_AYL')
    create(:character, xml_id: 'DukeSenior_AYL')
    create(:character, xml_id: 'Orlando_AYL')
    create(:character, xml_id: 'Oliver_AYL')
    create(:character, xml_id: "Rosalind_AYL")
    create(:character_group, xml_id: 'ATTENDANTS_AYL')
    create(:character_group, xml_id: 'LORDS.FREDERICK_AYL')
    create(:character_group, xml_id: 'LORDS.SENIOR_AYL')
    create(:character, xml_id: "LORDS.SENIOR.Amiens_AYL")
  end

  it 'parses the xml' do
    expect(@xml.children.size).to be > 0
  end

  it 'builds acts' do
    act = @import.build_acts(play: @play, parsed_xml: @xml)
    expect(act.number).to eq(6)
    expect(act.heading).to eq('EPILOGUE')
  end

  it 'builds a character' do
    character = @xml.xpath('//person').first
    test_character = @import.build_character(character: character, play: @play)
    expect(test_character.play).to eq(@play)
    expect(test_character.description).to include('Old guy')
    expect(test_character.gender).to eq('male')
    expect(test_character.name).to eq('Adam')
    expect(test_character.xml_id).to eq('Adam_AYL')
  end
  it 'builds a character group' do
    character_group = @xml.xpath('//personGrp')[2]
    test_character_group = @import.build_character_group(character_group: character_group, play: @play)
    expect(test_character_group.play).to eq(@play)
    expect(test_character_group.corresp).to eq('#LORDS_AYL')
    expect(test_character_group.xml_id).to eq('LORDS.FREDERICK_AYL')
  end


  it 'builds a character and adds it to a character group' do
    character_group = @xml.xpath('//personGrp')[2]
    test_character_group = @import.build_character_group(character_group: character_group, play: @play)
    character = @xml.at_xpath('//person[@xml:id="LORDS.FREDERICK.0.2_AYL"]')
    test_character = @import.build_character(character: character, play: @play)
    expect(test_character.play).to eq(@play)
    expect(test_character.gender).to eq('male')
    expect(test_character.name).to eq('Second Lord')
    expect(test_character.xml_id).to eq('LORDS.FREDERICK.0.2_AYL')
    expect(test_character.corresp).to eq('#LORDS.FREDERICK_AYL')
    expect(test_character.character_group.xml_id).to eq('LORDS.FREDERICK_AYL')
  end

  it 'builds all the characters for the play' do
    @import.build_characters(play: @play)
    expect(Character.all.map(&:xml_id)).to include('Rosalind_AYL')
    expect(CharacterGroup.all.map(&:xml_id)).to include('ATTENDANTS_AYL')
  end

  it 'builds a french scene' do
    scene = build(:scene)
    test_french_scene = @import.build_french_scene(french_scene_number: 'b', scene: scene)
    expect(test_french_scene.number).to eq('b')
    expect(test_french_scene.scene).to eq(scene)
  end
  it 'builds a header' do
    head_text = @xml.xpath('//div2/head').first
    expect(@import.build_header(item: head_text)).to eq('Scene 1')
  end

  it 'builds a line' do
    character = create(:character)
    french_scene = create(:french_scene)
    line = @xml.at_xpath('//milestone[@xml:id="ftln-0172"]')
    test_line = @import.build_line(character: [character], french_scene: french_scene, line: line)
    expect(test_line.character).to eq(character)
    expect(test_line.french_scene).to eq(french_scene)
  end

  it 'builds a line of content' do #too deep in the weeds to legitimately unit test, I think...
    character = create(:character)
    french_scene = create(:french_scene)
    line = @xml.at_xpath('//milestone[@xml:id="ftln-0172"]')
    test_line = @import.build_line(character: [character], french_scene: french_scene, line: line)
    @import.build_lines_content([test_line]).each {|l| puts line.content}
  end

  it 'builds onstages' do
    french_scene = create(:french_scene)
    characters = [Character.all.to_a, CharacterGroup.all.to_a]
    character_count = Character.all.size + CharacterGroup.all.size
    old_on_stages = OnStage.all.size
    puts "target number = #{character_count + old_on_stages}"
    new_on_stages = @import.build_on_stages(french_scene: french_scene, characters: characters)

    expect(character_count + old_on_stages).to eq(new_on_stages.size)
  end

  it 'builds a play' do
    old_number_of_plays = Play.all.size
    @import.build_play
    new_number_of_plays = Play.all.size
    expect(old_number_of_plays + 1).to eq(new_number_of_plays)
    expect(@import.play.title).to eq('As You Like It')
    expect(@import.play.author.last_name).to eq('Shakespeare')
    expect(@import.play.synopsis).to include('witty words and romance play out against')
    expect(@import.play.text_notes).to include('Barbara A. Mowat')
  end

  it 'builds a scene' do
    act = build(:act)
    scene = @xml.xpath('//div2')[1]
    test_scene = @import.build_scene(act: act, scene: scene)
    expect(test_scene.act_id).to eq(act.id)
    expect(test_scene.heading).to eq('Scene 2')
    expect(test_scene.french_scenes.size).to eq(3)
  end

  it 'builds a sound cue' do
    french_scene = create(:french_scene)
    item = @xml.at_xpath('//sound[@xml:id="snd-0312.1"]')
    sound_cue = @import.build_sound_cue(french_scene: french_scene, item: item)
    expect(sound_cue.content).to eq('Flourish.')
    expect(sound_cue.french_scene).to eq(french_scene)
    expect(sound_cue.line_number).to eq('SD 1.2.142.1')
    expect(sound_cue.notes).to eq('flourish')
    expect(sound_cue.kind).to eq('flourish')
    expect(sound_cue.xml_id).to eq('snd-0312.1')
  end

  it 'builds a speech' do

  end

  it 'builds a stage direction' do
    french_scene = create(:french_scene)
    line = @xml.at_xpath('//stage[@xml:id="stg-0312.1"]')
    test_stage_direction = @import.build_stage_direction(french_scene: french_scene, item: line)
    expect(test_stage_direction.content).to eq(' Enter Duke Frederick, Lords, Orlando,Charles, and Attendants.')
    expect(test_stage_direction.french_scene).to eq(french_scene)
    expect(test_stage_direction.number).to eq('SD 1.2.142.1')
    expect(test_stage_direction.kind).to eq('entrance')
    expect(test_stage_direction.xml_id).to eq('stg-0312.1')
    expect(test_stage_direction.characters.first.xml_id).to eq('DukeFrederick_AYL')
    expect(test_stage_direction.characters.size).to eq(3)
    expect(test_stage_direction.character_groups.size).to eq(2)
  end

  it 'builds a word' do
    line = build(:line)
    word = @xml.at_xpath('//w[@xml:id="w0153740"]')
    space = @xml.at_xpath('//c[@xml:id="c0153750"]')
    punctuation = @xml.at_xpath('//pc[@xml:id="p0153790"]')
    test_word = @import.build_word(word: word)
    test_space = @import.build_word(word: space)
    test_punctuation = @import.build_word(word: punctuation)
    expect(test_word.kind).to eq('word')
    expect(test_word.content).to eq("What’s")
    expect(test_word.line_number).to eq('2.5.56')
    expect(test_space.kind).to eq('space')
    expect(test_space.content).to eq(" ")
    expect(test_space.line_number).to eq('2.5.56')
    expect(test_punctuation.kind).to eq('punctuation')
    expect(test_punctuation.content).to eq("?")
    expect(test_punctuation.line_number).to eq('2.5.56')
  end

  it 'connects lines to words' do
    act = create(:act, play: @play)
    scene = create(:scene, act: act)
    french_scene = create(:french_scene, scene: scene)
    french_scene.lines << create(:line, corresp: "#w0000700 #c0000710 #w0000720 #c0000730 #w0000740 #c0000750 #w0000760 #c0000770 #w0000780 #c0000790 #w0000800 #p0000810 #c0000820 #w0000830 #c0000840 #w0000850 #c0000860 #w0000870 #c0000880 #w0000890")
    word01 = create(:word, xml_id: "w0000700")
    @play.words << word01
    @play.words << create(:word, xml_id: "c0000710")
    @play.words << create(:word, xml_id: "w0000720")
    @play.words << create(:word, xml_id: "c0000730")
    @play.words << create(:word, xml_id: "w0000740")
    @play.words << create(:word, xml_id: "c0000750")
    @play.words << create(:word, xml_id: "w0000760")
    @play.words << create(:word, xml_id: "c0000770")
    @play.words << create(:word, xml_id: "w0000780")
    @play.words << create(:word, xml_id: "c0000790")
    @play.words << create(:word, xml_id: "w0000800")
    @play.words << create(:word, xml_id: "p0000810")
    @play.words << create(:word, xml_id: "c0000820")
    @play.words << create(:word, xml_id: "w0000830")
    @play.words << create(:word, xml_id: "c0000840")
    @play.words << create(:word, xml_id: "w0000850")
    @play.words << create(:word, xml_id: "c0000860")
    @play.words << create(:word, xml_id: "w0000870")
    @play.words << create(:word, xml_id: "c0000880")
    word20 = create(:word, xml_id: "w0000890")
    @play.words << word20
    @import.connect_lines_to_words(play: @play)
    expect(@play.lines.first.words.size).to eq(20)
    expect(@play.lines.first.words.first).to eq(word01)
    expect(@play.lines.first.words.last).to eq(word20)
    expect(Word.find(word01.id).line_id).to eq(@play.lines.first.id)
    expect(Word.find(word20.id).line_id).to eq(@play.lines.first.id)
  end

  it 'determines the type of item' do
    #tk
  end

  it 'extracts characters from xml string' do
    xml_ids = '#Adam_AYL #DukeFrederick_AYL #LORDS.FREDERICK_AYL'
    character_parser = @import.extract_characters_from_xml_id_string(xml_ids: xml_ids)
    expect(character_parser.size).to eq(2)
    expect(character_parser[0].size).to eq(2)
    expect(character_parser[0][0].name).to eq('Adam')
    expect(character_parser[1].size).to eq(1)
    expect(character_parser[1][0].xml_id).to eq('LORDS.FREDERICK_AYL')
  end

  it 'extracts content and builds a text string' do
    item = @xml.at_xpath('//sound[@xml:id="snd-0312.1"]')
    content = @import.extract_content(item: item)
    expect(content).to eq('Flourish.')
  end

  it 'extracts items from corresp' do
    #tk
  end
  it 'processes an item' do

  end
  it 'checks that item has no children' do
    no_children = @xml.at_xpath('//w[@xml:id="w0153740"]')
    expect(@import.verify_no_more_children(no_children)).to be true
    has_children = @xml.at_xpath('//q[@xml:id="q-0016"]')
    expect(@import.verify_no_more_children(has_children)).to be false
  end

  it 'tracks who is onstage' do
    french_scene = create(:french_scene)
    stage_direction = @xml.at_xpath('//stage[@xml:id="stg-0025.1"]')
    @import.current_characters_onstage = []
    @import.track_onstage_characters(french_scene: french_scene, stage_direction: stage_direction)
    expect(@import.current_characters_onstage.size).to eq(1)
    expect(@import.current_characters_onstage.first.xml_id).to eq('Oliver_AYL')
    stage_direction = @xml.at_xpath('//stage[@xml:id="stg-0170.1"]')
    @import.track_onstage_characters(french_scene: french_scene, stage_direction: stage_direction)
    expect(@import.current_characters_onstage.size).to eq(0)
  end

  it "builds speeches and lines for a scene" do
    speeches = @xml.xpath('//sp')
    scene = @xml.xpath('//div1[@n="1"]/div2')[1]
    act = build(:act)
    test_scene = @import.build_scene(act: act, scene: scene)
    expect(test_scene.french_scenes.size).to eq(3)
  end
end
