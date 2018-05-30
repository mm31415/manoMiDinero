class ChangePayments < ActiveRecord::Migration[5.1]
  def change
    remove_column :payments, :bill_id
    remove_column :payments, :user_id
    add_column :payments, :friendship_id, :integer, null: false
    add_index :payments, :friendship_id
  end
end
