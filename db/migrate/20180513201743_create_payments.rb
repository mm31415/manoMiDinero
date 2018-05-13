class CreatePayments < ActiveRecord::Migration[5.1]
  def change
    create_table :payments do |t|
      t.float :amount, null: false
      t.integer :bill_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
      add_index :payments, [:bill_id, :user_id], unique: true
  end
end
