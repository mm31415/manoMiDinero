import * as BillUtil from "../util/bill_util";
export const RECEIVE_BILLS = "RECEIVE_BILLS";
export const RECEIVE_BILL = "RECEIVE_BILL";
export const REMOVE_BILL = "REMOVE_BILL";
export const RECEIVE_BILL_ERRORS = "RECEIVE_BILL_ERRORS";
export const RESET_BILL_ERRORS = "RESET_BILL_ERRORS";
export const ADD_EDIT_BILL_ID = "ADD_EDIT_BILL_ID";
export const REMOVE_EDIT_BILL_ID = "REMOVE_EDIT_BILL_ID";

const receiveBills = (bills) => {
  return {
    type: RECEIVE_BILLS,
    bills: bills
  };
};

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

export const addEditBillId = (id) => {
  return {
    type: ADD_EDIT_BILL_ID,
    billId: id
  };
};

export const removeEditBillId = () => {
  return {
    type: REMOVE_EDIT_BILL_ID
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

export const fetchBills = () => {
  return (dispatch) => {
    return BillUtil.fetchBills().then(({ bills }) => {
      return dispatch(receiveBills(bills));
    });
  };
};

export const addBill = (bill, friend) => {
  return (dispatch) => {
    return BillUtil.addBill(bill, friend).then(
      (bill) => { return dispatch(receiveBill(bill)); },
      (errors) => { return dispatch(receiveBillErrors(errors)); }
    );
  };
};

export const updateBill = (bill) => {
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
      ({ id }) => { return dispatch(removeBill(id)); },
      (errors) => { return dispatch(receiveBillErrors(errors)); }
    );
  };
};
