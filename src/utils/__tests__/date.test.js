import { getDatePlusDeltaDays, getFinnishDateRepr } from '../date';

it('it adds and substracts days correctly', () => {
  const date = new Date(2019, 0, 1);

  const result1 = getDatePlusDeltaDays(date, 1);
  expect(result1.getTime()).toEqual((new Date(2019, 0, 2).getTime()));

  const result2 = getDatePlusDeltaDays(date, -1);
  expect(result2.getTime()).toEqual((new Date(2018, 11, 31).getTime()));

  const result3 = getDatePlusDeltaDays(date, 0);
  expect(result3.getTime()).toEqual(new Date(2019, 0, 1).getTime());
});

it('gives the expected date representation', () => {
  const date = new Date(2019, 0, 1);
  const result = getFinnishDateRepr(date);
  expect(result).toEqual('01.01.2019');
});
