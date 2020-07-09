module Types
  class WordType < Types::BaseObject
    field :content, String, null: false
    field :id, ID, null: false
    field :kind, String, null: true
    field :line, Types::LineType, null: false
    field :line_number, String, null: true
    field :xml_id, String, null: true
  end
end
