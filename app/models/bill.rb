class Bill < ApplicationRecord
  validates :amount, :description, :date, :creator_id, presence: true

  belongs_to(
    :creator,
    class_name: "User",
    foreign_key: :creator_id,
    primary_key: :id
  )

  has_many(
    :bill_splits,
    class_name: "BillSplit",
    foreign_key: :bill_id,
    primary_key: :id,
    dependent: :destroy
  )

  has_many(
    :payments,
    class_name: "Payment",
    foreign_key: :bill_id,
    primary_key: :id,
    dependent: :destroy
  )

end
