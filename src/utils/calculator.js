
const countFromForm = (total, expense) => {
  return total + parseFloat(expense.price);
};

const totalPrice = (expenses) => expenses.reduce(countFromForm, 0).toFixed(2);

export default totalPrice;
