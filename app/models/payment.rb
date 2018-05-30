class Payment < ApplicationRecord
  validates :amount, :friendship_id, presence: true

  belongs_to(
    :friendship,
    class_name: "Friendship",
    foreign_key: :friendship_id,
    primary_key: :id
  )  

end
