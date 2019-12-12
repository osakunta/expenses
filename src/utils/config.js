export const BILLER = 'biller';

export const emptyBiller = {
  name: '',
  address: '',
  zipCode: '',
  postOffice: '',
  iban: '',
};

export const newBiller = JSON.parse(window.localStorage.getItem(BILLER)) || emptyBiller;
