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
    expect(act.number).to eq(2)
    expect(act.heading).to eq('ACT 2')
  end

  it 'builds a character' do
    character = @xml.xpath('//person').first
    test_character = @import.build_character(character: character, play: @play)
    expect(test_character.play).to be(@play)
    expect(test_character.description).to include('youngest son of Sir Rowland de Boys')
    expect(test_character.gender).to eq('male')
    expect(test_character.name).to eq('Orlando')
    expect(test_character.xml_id).to eq('Orlando_AYL')
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
    expect(test_character.play).to be(@play)
    expect(test_character.gender).to eq('male')
    expect(test_character.name).to eq('Second Lord')
    expect(test_character.xml_id).to eq('LORDS.FREDERICK.0.2_AYL')
    expect(test_character.corresp).to eq('#LORDS.FREDERICK_AYL')
    expect(test_character.character_group.xml_id).to eq('LORDS.FREDERICK_AYL')
  end

  it 'builds all the characters for the play' do
    old_character_groups = CharacterGroup.all.size
    old_characters = Character.all.size
    @import.build_characters(play: @play)
    new_character_groups = CharacterGroup.all.size
    new_characters = Character.all.size
    expect(old_character_groups + 3).to eq(new_character_groups)
    expect(old_characters + 6).to eq(new_characters)
  end

  it 'builds a french scene' do
    scene = create(:scene)
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
    test_line = @import.build_line(character: character, french_scene: french_scene, line: line)
    expect(test_line.character).to eq(character)
    expect(test_line.french_scene).to eq(french_scene)
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
    act = create(:act)
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
    line = create(:line)
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

  it "builds speeches and lines for a scene" do
    speeches = @xml.xpath('//sp')
    scene = @xml.xpath('//div1[@n="1"]/div2')[1]
    act = create(:act)
    test_scene = @import.build_scene(act: act, scene: scene)
    expect(test_scene.french_scenes.size).to eq(3)
  end
end
