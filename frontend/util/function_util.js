export const combineDate = (date) => {
  return date.split("-").reduce((acc, curr) => acc + curr);
};

export const mapAndSortFriendBills = (bills_obj, friendId) => {
  const friendBills = [];
  Object.values(bills_obj).forEach((value) => {
    if (value.splits[0].user_id == friendId || value.splits[1].user_id == friendId) {
      friendBills.push(value);
    }
  });

  return friendBills.sort((a,b) => combineDate(b.date) - combineDate(a.date));
};
