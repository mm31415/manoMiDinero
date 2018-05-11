class Friendship < ApplicationRecord
  validates :user1_id, :user2_id, presence: true
  validates :user1_id, uniqueness: { scope: :user2_id }

end
