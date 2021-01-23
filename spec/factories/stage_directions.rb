FactoryBot.define do
  factory :stage_direction do
    xml_id { "x-001" }
    number {"1"}
    kind { "entrance" }
    french_scene
    original_content {"Enter Cleopatra"}
  end
end
