export const getFinnishDateRepr = (date) => {
    const padChar = '0';
    const separator = '.';
    var result = '';
    result += date.getDate().toString().padStart(2, padChar) + separator;
    result += (date.getUTCMonth() + 1).toString().padStart(2, padChar) + separator;
    result += date.getFullYear().toString();
    return result;
}
  
export const getDatePlusDeltaDays = (date, nDays) => {
    let deltaMilliseconds = nDays * 24 * 60 * 60 * 1000;
    return new Date(date.getTime() + deltaMilliseconds);
}