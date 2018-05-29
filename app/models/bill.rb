class Bill < ApplicationRecord
  validates :amount, :description, :date, :creator_id, :payer_id, presence: true

  belongs_to(
    :creator,
    class_name: "User",
    foreign_key: :creator_id,
    primary_key: :id
  )

  has_many(
    :splits,
    class_name: "BillSplit",
    foreign_key: :bill_id,
    primary_key: :id,
    dependent: :destroy
  )

  has_one(
    :shared_bill,
    class_name: "SharedBill",
    foreign_key: :bill_id,
    primary_key: :id,
    dependent: :destroy
  )

  def to_h
    {
      id: self.id,
      amount: self.amount,
      description: self.description,
      date: self.date,
      creatorId: self.creator_id,
      payer_id: self.payer_id,
      splits: []
    }
  end

end
