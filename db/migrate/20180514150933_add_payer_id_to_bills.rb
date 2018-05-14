class AddPayerIdToBills < ActiveRecord::Migration[5.1]
  def change
    add_column :bills, :payer_id, :integer, null: false
    add_index :bills, :payer_id
  end
end
