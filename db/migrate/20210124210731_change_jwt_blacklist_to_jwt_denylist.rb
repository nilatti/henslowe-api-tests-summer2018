class ChangeJwtBlacklistToJwtDenylist < ActiveRecord::Migration[6.1]
  def change
    rename_table :jwt_blacklist, :jwt_denylist
  end
end
