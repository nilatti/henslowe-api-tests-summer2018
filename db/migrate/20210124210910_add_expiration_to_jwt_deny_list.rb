class AddExpirationToJwtDenyList < ActiveRecord::Migration[6.1]
  def change
    add_column :jwt_denylist, :exp, :datetime, null: false
  end
end
