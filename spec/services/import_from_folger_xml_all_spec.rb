require 'rails_helper'

describe ImportFromFolgerXmlAll do
  before(:all) do
    @import = ImportFromFolgerXmlAll.new('spec/data/folger_test.xml')
    create(:author, last_name: 'Shakespeare')
    @play = @import.build_play
  end

  it 'parses the xml' do
    expect(@import.parsed_xml.children.size).to be > 0
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

  it 'builds a character group' do
    character_group = @import.parsed_xml.xpath('//personGrp')[2]
    test_character_group = @import.build_character_group(character_group: character_group, play: @play)
    expect(test_character_group.play).to eq(@play)
    expect(test_character_group.corresp).to eq('#LORDS_AYL')
    expect(test_character_group.xml_id).to eq('LORDS.FREDERICK_AYL')
  end

  it 'builds a character' do
    character = @import.parsed_xml.xpath('//person').first
    test_character = @import.build_character(character: character, play: @play)
    expect(test_character.play).to be(@play)
    expect(test_character.description).to include('youngest son of Sir Rowland de Boys')
    expect(test_character.gender).to eq('male')
    expect(test_character.name).to eq('Orlando')
    expect(test_character.xml_id).to eq('Orlando_AYL')
  end

  it 'builds a character and adds it to a character group' do
    character_group = @import.parsed_xml.xpath('//personGrp')[2]
    test_character_group = @import.build_character_group(character_group: character_group, play: @play)
    character = @import.parsed_xml.xpath('//person[@xml:id="LORDS.FREDERICK.0.2_AYL"]').first
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

  it 'builds a word' do
    line = create(:line)
    word = @import.parsed_xml.xpath('//w[@xml:id="w0153740"]').first
    space = @import.parsed_xml.xpath('//c[@xml:id="c0153750"]').first
    punctuation = @import.parsed_xml.xpath('//pc[@xml:id="p0153790"]').first
    test_word = @import.build_word(line: line, word: word)
    test_space = @import.build_word(line: line, word: space)
    test_punctuation = @import.build_word(line: line, word: punctuation)
    expect(test_word.kind).to eq('word')
    expect(test_word.content).to eq("What’s")
    expect(test_word.line.id).to eq(line.id)
    expect(test_word.line_number).to eq('2.5.56')
    expect(test_space.kind).to eq('space')
    expect(test_space.content).to eq(" ")
    expect(test_space.line.id).to eq(line.id)
    expect(test_space.line_number).to eq('2.5.56')
    expect(test_punctuation.kind).to eq('punctuation')
    expect(test_punctuation.content).to eq("?")
    expect(test_punctuation.line.id).to eq(line.id)
    expect(test_punctuation.line_number).to eq('2.5.56')
  end

  # it 'builds all acts' do
  #   @import.build_acts(parsed_xml: @import.parsed_xml, play: @play)
  #   puts @play.acts.size
  # end

end
