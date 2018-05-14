import * as BillUtil from "../util/bill_util";

export const RECEIVE_BILL = "RECEIVE_BILL";
export const REMOVE_BILL = "REMOVE_BILL";
// export const RECEIVE_SPLITS = "RECEIVE_SPLITS";
// export const RECEIVE_PAYMENTS = "RECEIVE_PAYMENTS";
export const RECEIVE_BILL_ERRORS = "RECEIVE_BILL_ERRORS";
export const RESET_BILL_ERRORS = "RESET_BILL_ERRORS";

const receiveBill = (bill) => {
  return {
    type: RECEIVE_BILL,
    bill: bill
  };
};

const removeBill = (id) => {
  return {
    type: REMOVE_BILL,
    billId: id
  };
};

const receiveBillErrors = (errors) => {
  return {
    type: RECEIVE_BILL_ERRORS,
    errors: errors.responseJSON.errors
  };
};

export const resetBillErros = () => {
  return {
    type: RESET_BILL_ERRORS
  };
};

export const addBill = (bill, splits) => {
  return (dispatch) => {
    return BillUtil.addBill(bill).then(
      (bill) => { return dispatch(receiveBill(bill)); },
      (errors) => { return dispatch(receiveBillErrors(errors)); }
    );
  };
};

export const updateBill = (bill, splits) => {
  return (dispatch) => {
    return BillUtil.updateBill(bill).then(
      (bill) => { return dispatch(receiveBill(bill)); },
      (errors) => { return dispatch(receiveBillErrors(errors)); }
    );
  };
};

export const deleteBill = (id) => {
  return (dispatch) => {
    return BillUtil.deleteBill(id).then(
      (id) => { return dispatch(removeBill(id)) }
    );
  };
};





///  I don't think i need these
///  I am planning on sending back bills with their
///  payments and splits nested in them

// const receiveSplits = (splits) => {
//   return {
//     type: RECEIVE_SPLITS,
//     splits: splits
//   };
// };
//
// const receivePayments = (payments) => {
//   return {
//     type: RECEIVE_PAYMENTS,
//     payments: payments
//   };
// };

// export const addSplits = (splits) => {
//   return (dispatch) => {
//     return BillUtil.addSplits(splits).then(
//       (splits) => { return dispatch(receiveSplits(splits)); },
//       (errors) => { return dispatch(receiveBillErrors(errors)); }
//     );
//   };
// };
//
// export const updateSplits = (splits) => {
//   return (dispatch) => {
//     return BillUtil.updateSplits(splits).then(
//       (splits) => { return dispatch(receiveSplits(splits)); },
//       (errors) => { return dispatch(receiveBillErrors(errors)); }
//     );
//   };
// };
//
// export const addPayments = (payments) => {
//   return (dispatch) => {
//     return BillUtil.addPayments(payments).then(
//       (payments) => { return dispatch(receivePayments(payments)); },
//       (errors) => { return dispatch(receiveBillErrors(errors)); }
//     );
//   };
// };
//
// export const updatePayments = (payments) => {
//   return (dispatch) => {
//     return BillUtil.updatePayments(payments).then(
//       (payments) => { return dispatch(receivePayments(payments)); },
//       (errors) => { return dispatch(receiveBillErrors(errors)); }
//     );
//   };
// };
