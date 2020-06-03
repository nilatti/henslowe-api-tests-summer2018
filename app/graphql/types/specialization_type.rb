module Types
  class SpecializationType < Types::BaseObject
    field :description, String, null: true
    field :id, ID, null: false
    field :title, String, null: false
  end
end
