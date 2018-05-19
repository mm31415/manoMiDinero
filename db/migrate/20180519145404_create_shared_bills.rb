class CreateSharedBills < ActiveRecord::Migration[5.1]
  def change
    create_table :shared_bills do |t|
      t.integer :bill_id, null: false
      t.integer :friendship_id, null: false
      t.timestamps
    end
    add_index :shared_bills, [:bill_id, :friendship_id], unique: true
  end
end
