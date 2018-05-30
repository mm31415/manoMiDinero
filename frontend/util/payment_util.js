export const addPayment = (payment) => {
  return $.ajax({
    method: "POST",
    url: "api/payments",
    data: payment
  });
};

export const fetchPayments = () => {
  return $.ajax({
    method: "GET",
    url: "api/payments"
  });
};
