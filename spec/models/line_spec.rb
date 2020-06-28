require 'rails_helper'

RSpec.describe Line, type: :model do
  before(:all) do
    @play = create(:play, canonical: true) #this play has three acts. each act has 3 scenes. each scene has 3 french scenes.
    first_act = @play.acts.first
    @first_scene = first_act.scenes.first
    @character = create(:character, play: @play)
    @line = create(:line, french_scene: @first_scene.french_scenes.first, character: @character, original_content: 'If music be the food of love, play on!', new_content: '')
  end

  it 'updates own line count, character line count, and play line count on save' do
    @line.new_content = 'If music be the banquet of love, perform it continually.'
    @line.save
    expect(@line.new_content).to eq('If music be the banquet of love, perform it continually.')
    expect(@line.original_line_count == 1.0)
    expect(@line.new_line_count == 1.8)
    expect(@character.original_line_count == 1.0)
    expect(@character.new_line_count == 1.8)
    expect(@play.original_line_count == 1.0)
    expect(@play.new_line_count == 1.8)
  end
end
