import { getDatePlusDeltaDays, getFinnishDateRepr } from '../date'

it('it adds and substracts days correctly', () => {
    let date = new Date(2019, 0, 1);
    
    var result = getDatePlusDeltaDays(date, 1);
    expect(result.getTime()).toEqual((new Date(2019, 0, 2).getTime()));

    var result = getDatePlusDeltaDays(date, -1);
    expect(result.getTime()).toEqual((new Date(2018, 11, 31).getTime()));

    var result = getDatePlusDeltaDays(date, 0);
    expect(result.getTime()).toEqual(new Date(2019, 0, 1).getTime());
});

it('gives the expected date representation', () => {
    let date = new Date(2019, 0, 1);
    var result = getFinnishDateRepr(date);
    expect(result).toEqual("01.01.2019");
});