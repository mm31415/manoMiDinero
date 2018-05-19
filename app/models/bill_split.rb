class BillSplit < ApplicationRecord
  validates :amount, :bill_id, :user_id, presence: true
  validates :bill_id, uniqueness: { scope: :user_id }

  belongs_to(
    :bill,
    class_name: "Bill",
    foreign_key: :bill_id,
    primary_key: :id
  )

end
