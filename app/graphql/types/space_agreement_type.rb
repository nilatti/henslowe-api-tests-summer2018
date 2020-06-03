module Types
  class SpaceAgreementType < Types::BaseObject
    field :id, ID, null: false
    field :space, Types::SpaceType, null: false
    field :theater, Types::TheaterType, null: false
  end
end
