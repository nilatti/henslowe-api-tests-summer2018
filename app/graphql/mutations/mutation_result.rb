module Mutations
  class MutationResult
    def self.call(obj: {}, success: true, errors: [], token: '')
      obj.merge(success: success, errors: errors, token: token)
    end
  end
end
