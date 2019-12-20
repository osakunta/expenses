import { getSerialNumber } from '../barcode';

it('get right serial number from inputs', () => {
    const expected = '468126935002808370000301200000000000000000000003190201'
    let iban = 'FI68 1269 3500 2808 37';
    let price = 30.12;
    let referenceNumber = 3;
    let dueDate = new Date(2019, 1, 1);

    let result = getSerialNumber(iban, price, referenceNumber, dueDate);

    expect(result).toEqual(expected);
});
