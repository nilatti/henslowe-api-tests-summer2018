class Word < ApplicationRecord
  belongs_to :line, optional: true
  belongs_to :play
end
