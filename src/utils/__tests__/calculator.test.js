import totalPrice from '../calculator';

it('calculates total price from strings and shows two decimal points', () => {
  const expenses = [
    { price: '1' },
    { price: '2.5' },
  ];

  const sum = totalPrice(expenses);

  expect(sum).toEqual('3.50');
});
