export const addBill = (bill, friend) => {
  return $.ajax({
    method: "POST",
    url: "api/bills",
    data: {
      bill: bill,
      friend: friend
    }
  });
};

export const updateBill = (bill) => {
  return $.ajax({
    method: "PATCH",
    url: `api/bills/${bill.id}`,
    data: {
      bill: bill
    }
  });
};

export const deleteBill = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `api/bills/${id}`
  });
};

export const fetchBills = () => {
  return $.ajax({
    method: "GET",
    url: "api/bills"
  });
};
