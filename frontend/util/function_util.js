export const combineDate = (date) => {
  return date.split("-").reduce((acc, curr) => acc + curr);
};

export const mapAndSortFriendBills = (bills_obj, friendId) => {
  const friendBills = [];
  Object.values(bills_obj).forEach((value) => {
    if (value.splits[0].user_id == friendId ||
      value.splits[1].user_id == friendId) {
      friendBills.push(value);
    }
  });

  return friendBills.sort((a,b) => combineDate(b.date) - combineDate(a.date));
};

export const balance = (bills, userId) => {
  let balance = 0.0;
  bills.forEach((bill) => {
    let amount;
    if (bill.splits[0].user_id === bill.payer_id) {
      amount = bill.splits[0].amount;
    } else {
      amount = bill.splits[1].amount;
    }
    if (bill.payer_id === userId) {
      balance += (amount - 0);
    } else {
      balance -= (amount - 0);
    }
  });
  return balance;
};
