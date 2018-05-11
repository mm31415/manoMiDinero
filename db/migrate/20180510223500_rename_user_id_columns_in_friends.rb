class RenameUserIdColumnsInFriends < ActiveRecord::Migration[5.1]
  def change
    change_table :friendships do |t|
      t.rename :user_id1, :user1_id
      t.rename :user_id2, :user2_id
    end
  end
end
