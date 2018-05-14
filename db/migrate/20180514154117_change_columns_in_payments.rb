// make bills and bill splits first before fixing this


# class ChangeColumnsInPayments < ActiveRecord::Migration[5.1]
#   def change
#     remove_column :payments, :bill_id
#     remove_column :payments, :user_id
#     remove_index :payments, name: "index_payments_on_bill_id_and_user_id"
#     add_column :payments, :payer_id, :integer, null: false
#     add_column :payments, :payee_id, :integer, null: false
#     add_index :payments, [:payer_id, :payee_id]
#   end
# end
