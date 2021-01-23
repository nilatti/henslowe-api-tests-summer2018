FactoryBot.define do
  factory :sound_cue do
    xml_id { "x-001" }
    line_number { "1.2.14" }
    kind { "music" }
    french_scene
    notes {Faker::Movies::Lebowski.quote}
    original_content {"sound trumpets alarum"}
  end
end
