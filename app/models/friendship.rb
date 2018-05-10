class Friendship < ApplicationRecord
  validates :user_id1, :user_id2, presence: true
  validates :user_id1, uniqueness: { scope: :user_id2 }

end
