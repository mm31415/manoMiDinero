class CreateBills < ActiveRecord::Migration[5.1]
  def change
    create_table :bills do |t|
      t.float :amount, null: false
      t.string :description, null: false
      t.string :date, null: false
      t.text :note
      t.integer :creator_id, null: false
      t.timestamps
    end
    add_index :bills, :creator_id
  end
end
