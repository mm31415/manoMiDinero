export const fetchFriends = () => {
  return $.ajax({
    method: "GET",
    url: "api/friendships"
  });
};

export const addFriend = (user1_id, friend_email) => {
  return $.ajax({
    method: "POST",
    url: "api/friendships",
    data: {
      friendship: { user1_id: user1_id, friend_email: friend_email }
    }
  });
};

export const deleteFriend = (user1_id, user2_id) => {
  return $.ajax({
    method: "DELETE",
    url: "api/friendships",
    data: {
      friendship: { user1_id: user1_id, user2_id: user2_id }
    }
  });
};
