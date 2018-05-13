class CreateBillSplits < ActiveRecord::Migration[5.1]
  def change
    create_table :bill_splits do |t|
      t.float :amount, null: false
      t.integer :bill_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :bill_splits, [:bill_id, :user_id], unique: true
  end
end
