class Theater < ApplicationRecord
  validates_presence_of :name
  default_scope { order('name ASC') }
end
