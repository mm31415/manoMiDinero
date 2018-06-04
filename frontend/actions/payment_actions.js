import * as  PaymentUtil from "../util/payment_util";

export const RECEIVE_PAYMENT = "RECEIVE_PAYMENT";
export const RECEIVE_PAYMENTS = "RECEIVE_PAYMENTS";
export const REMOVE_PAYMENT = "REMOVE_PAYMENT";

const receivePayment = (payment) => {
  return {
    type: RECEIVE_PAYMENT,
    payment: payment
  };
};

const receivePayments = (payments) => {
  return {
    type: RECEIVE_PAYMENTS,
    payments: payments
  };
};

const removePayment = (paymentId) => {
  return {
    type: REMOVE_PAYMENT,
    paymentId: paymentId
  };
};

export const addPayment = payment => {
  return (dispatch) => {
    return PaymentUtil.addPayment(payment).then((payment) => {
      return dispatch(receivePayment(payment));
    });
  };
};

export const fetchPayments = () => {
  return (dispatch) => {
    return PaymentUtil.fetchPayments().then(({ payments }) => {
      return dispatch(receivePayments(payments));
    });
  };
};

export const deletePayment = (id) => {
  return (dispatch) => {
    return PaymentUtil.deletePayment(id).then(({ paymentId }) => {
      return dispatch(removePayment(paymentId));
    });
  };
};
