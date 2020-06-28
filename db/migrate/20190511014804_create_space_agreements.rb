class CreateSpaceAgreements < ActiveRecord::Migration[5.1]
  def change
    create_table :space_agreements do |t|
      t.belongs_to :theater, foreign_key: true
      t.belongs_to :space, foreign_key: true

      t.timestamps
    end
  end
end
