class AddDateToPayments < ActiveRecord::Migration[5.1]
  def change
    add_column :payments, :date, :string, null: false
  end
end
