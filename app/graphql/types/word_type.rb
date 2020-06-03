module Types
  class WordType < Types::BaseObject
    field :content, String, null: false
    field :id, ID, null: false
    field :kind, String, null: true
    field :line, Types::LineType, null: false
    field :lineNumber, String, null: true
    field :xmlId, String, null: true
  end
end
