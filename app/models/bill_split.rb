class BillSplit < ApplicationRecord
  validates :amount, :bill_id, :user_id, presence: true
  validates :bill_id, uniqueness: { scope: :user_id }

  
end
