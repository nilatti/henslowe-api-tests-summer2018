class FrenchScene < ApplicationRecord
  belongs_to :scene
  
  default_scope {order(:number)}
end
