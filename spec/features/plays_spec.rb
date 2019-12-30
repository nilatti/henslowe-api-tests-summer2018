require 'rails_helper'

RSpec.feature "plays", type: :feature, js: true do
  describe "plays" do
    let! (:play) { create (:play)}

    scenario "Visitor creates a play" do
      visit("/plays")
      click_link('Add New')
      fill_in('Title', with: 'This Is A Title')
      fill_in('Author', with: play.author)
      click_button('Submit')

    end

    scenario "Visitor views all plays" do
      visit("/plays")
      expect(page).to have_text("Plays")
    end

    scenario "Visitor one play" do
      puts play.id
      visit("/plays/#{play.id}")
      expect(page).to have_text(play.title)
    end
  end

end
