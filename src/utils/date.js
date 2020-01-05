export const getFinnishDateRepr = (date) => {
  const padChar = '0';
  const day = date.getDate().toString().padStart(2, padChar);
  const month = (date.getMonth() + 1).toString().padStart(2, padChar);
  const year = date.getFullYear().toString();

  return `${day}.${month}.${year}`;
};

export const getDatePlusDeltaDays = (date, nDays) => {
  const deltaMilliseconds = nDays * 24 * 60 * 60 * 1000;
  return new Date(date.getTime() + deltaMilliseconds);
};
