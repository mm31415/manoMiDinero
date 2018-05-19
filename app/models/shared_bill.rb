class SharedBill < ApplicationRecord
  validates :bill_id, :friendship_id, presence: true
  validates :friendship_id, uniqueness: { scope: :bill_id }

  belongs_to(
    :bill,
    class_name: "Bill",
    foreign_key: :bill_id,
    primary_key: :id
  )
end
