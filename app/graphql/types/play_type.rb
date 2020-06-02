module Types
  class PlayType < Types::BaseObject
    field :acts, [Types::ActType], null: true
    field :author, Types::AuthorType, null: true
    field :canonical, Boolean, null: false
    field :characterGroups, [Types::CharacterGroupType], null: true
    field :characters, [Types::CharacterType], null: true 
    field :date, String, null: true
    field :genre, [String], null: true
    field :id, ID, null: false
    field :synopsis, String, null: true
    field :text_notes, String, null: true
    field :title, String, null: false
  end
end
