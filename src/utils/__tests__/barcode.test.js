import { getSerialNumber } from '../barcode';

it('get right serial number from inputs', () => {
  const expected = '468126935002808370000301200000000000000000000003190101';
  const iban = 'FI68 1269 3500 2808 37';
  const price = 30.12;
  const referenceNumber = 3;
  const dueDate = new Date(2019, 0, 1);

  const result = getSerialNumber(iban, price, referenceNumber, dueDate);

  expect(result).toEqual(expected);
});
