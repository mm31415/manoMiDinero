class Friendship < ApplicationRecord
  validates :user1_id, :user2_id, presence: true
  validates :user1_id, uniqueness: { scope: :user2_id }

  belongs_to(
    :friend,
    class_name: "User",
    foreign_key: :user2_id,
    primary_key: :id
  )

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user1_id,
    primary_key: :id
  )

  has_many(
    :shared_bills,
    class_name: "SharedBill",
    foreign_key: :friendship_id,
    primary_key: :id,
    dependent: :destroy
  )

  has_many(
    :bills,
    through: :shared_bills,
    source: :bill,
    dependent: :destroy
  )

end
