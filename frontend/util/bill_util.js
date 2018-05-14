export const addBill = (bill, splits) => {
  return $.ajax({
    method: "POST",
    url: "api/bills",
    data: {
      bill: bill,
      bill_splits: {
        splits: splits
      }
    }
  });
};

export const updateBill = (bill, splits) => {
  return $.ajax({
    method: "PATCH",
    url: `api/bills/${bill.id}`,
    data: {
      bill: bill,
      bill_splits: {
        splits: splits
      }
    }
  });
};

export const deleteBill = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `api/bills/${id}`
  });
};

export const addPayment = (payment) => {
  return $.ajax({
    method: "POST",
    url: "api/payments",
    data: {  payment: payment }
  });
};

// export const updatePayments = (payments) => {
//   return $.ajax({
//     method: "PATCH",
//     url: "api/payments",
//     data: { payments: payments }
//   });
// };
//
// export const addSplits = (splits) => {
//   return $.ajax({
//     method: "POST",
//     url: "api/bill_splits",
//     data: {  splits: splits }
//   });
// };
//
// export const updateSplits = (splits) => {
//   return $.ajax({
//     method: "PATCH",
//     url: "api/bill_splits",
//     data: { splits: splits }
//   });
// };
