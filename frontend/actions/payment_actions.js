import * as  PaymentUtil from "../util/payment_util";

export const RECEIVE_PAYMENT = "RECEIVE_PAYMENT";
export const RECEIVE_PAYMENTS = "RECEIVE_PAYMENTS";

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

export const addPayment = dispatch => {
  return PaymentUtil.addPayment(payment).then((payment) => {
      return dispatch(receivePayment(payment))
  });
};

export const fetchPayments = dispatch => {
  return PaymentUtil.fetchPayments().then((payments) => {
    return dispatch(receivePayments(payments));
  });
};
