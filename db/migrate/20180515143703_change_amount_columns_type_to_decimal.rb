class ChangeAmountColumnsTypeToDecimal < ActiveRecord::Migration[5.1]
  def change
    change_column :bills, :amount, :decimal, precision: 16, scale: 2
    change_column :bill_splits, :amount, :decimal, precision: 16, scale: 2
    change_column :payments, :amount, :decimal, precision: 16, scale: 2
  end
end
