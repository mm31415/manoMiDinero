export const combineDate = (date) => {
  return date.split("-").reduce((acc, curr) => acc + curr);
};

export const mapAndSortFriendExpenses = (bills_obj, payments_obj, friendId) => {
  const friendExpenses = [];
  Object.values(bills_obj).forEach((value) => {
    if (value.splits[0].user_id == friendId ||
      value.splits[1].user_id == friendId) {
      friendExpenses.push(value);
    }
  });
  Object.values(payments_obj).forEach((value) => {
    if (value.payee_id == friendId ||
      value.payer_id == friendId) {
      friendExpenses.push(value);
    }
  });

  return friendExpenses.sort((a,b) => combineDate(b.date) - combineDate(a.date));
};

export const mapFriendExpenses = (bills_obj, payments_obj, friendId) => {
  const friendExpenses = [];
  Object.values(bills_obj).forEach((value) => {
    if (value.splits[0].user_id == friendId ||
      value.splits[1].user_id == friendId) {
      friendExpenses.push(value);
    }
  });
  Object.values(payments_obj).forEach((value) => {
    if (value.payee_id == friendId ||
      value.payer_id == friendId) {
      friendExpenses.push(value);
    }
  });

  return friendExpenses;
};

export const balance = (expenses, userId) => {
  let balance = 0.0;
  expenses.forEach((expense) => {
    let amount;
    if (expense.payee_id) {
      amount = expense.amount;
      if (expense.payer_id === userId) {
        balance += (amount - 0);
      } else {
        balance -= (amount - 0);
      }
    } else if(expense.splits) {
      if (expense.splits.length !== 0) {
        if (expense.splits[0].user_id === expense.payer_id) {
          amount = expense.splits[1].amount;
        } else {
          amount = expense.splits[0].amount;
        }
        if (expense.payer_id === userId) {
          balance += (amount - 0);
        } else {
          balance -= (amount - 0);
        }
      }
    }
  });
  return balance;
};
