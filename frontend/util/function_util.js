export const combineDate = (date) => {
  return date.split("-").reduce((acc, curr) => acc + curr);
};
