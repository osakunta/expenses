
const countFromForm = (total, expense) => {
  return typeof expense.price === 'number'
    ? total + expense.price
    : total;
};

const totalPrice = (expenses) => expenses.reduce(countFromForm, 0).toFixed(2);

export default totalPrice;
