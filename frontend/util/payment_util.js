export const addPayment = (payment) => {
  return $.ajax({
    method: "POST",
    url: "api/payments",
    data: { payment: payment }
  });
};

export const fetchPayments = () => {
  return $.ajax({
    method: "GET",
    url: "api/payments"
  });
};

export const deletePayment = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `api/payments/${id}`
  });
};
