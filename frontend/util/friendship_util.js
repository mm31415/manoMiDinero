export const fetchFriends = () => {
  return $.ajax({
    method: "GET",
    url: "api/friendships"
  });
};

export const addFriend = (email) => {
  return $.ajax({
    method: "POST",
    url: "api/friendships",
    data: {
      friendship: { friend_email: email }
    }
  });
};

export const deleteFriend = (friendId) => {
  return $.ajax({
    method: "DELETE",
    url: "api/friendship",
    data: {
      friendship: { friend_id: friendId }
    }
  });
};
