import React from 'react';
import PropTypes from 'prop-types';

import { BILLER, emptyBiller } from 'utils/config';

const BillerForm = (props) => {
  const {
    biller,
    setBiller,
    saveBiller,
    setSaveBiller,
  } = props;

  const handleBillerChange = (event) => {
    setBiller({ ...biller, [event.target.name]: event.target.value });
  };

  const handleSaveBillerChange = (event) => {
    setSaveBiller(event.target.checked);
  };

  const submitBiller = (event) => {
    event.preventDefault();

    if (saveBiller) {
      window.localStorage.setItem(BILLER, JSON.stringify(biller));
    }

    console.log(biller);
  };

  const clearBiller = (event) => {
    event.preventDefault();

    setBiller(emptyBiller);
    window.localStorage.removeItem(BILLER);

    console.log(biller);
  };

  return (
    <form onSubmit={submitBiller}>
      <input
        placeholder="Nimi"
        name="name"
        value={biller.name}
        onChange={handleBillerChange}
      />

      <input
        placeholder="Osoite"
        name="address"
        value={biller.address}
        onChange={handleBillerChange}
      />

      <input
        placeholder="Postinumero"
        name="zipCode"
        value={biller.zipCode}
        onChange={handleBillerChange}
      />

      <input
        placeholder="Postitoimipaikka"
        name="postOffice"
        value={biller.postOffice}
        onChange={handleBillerChange}
      />

      <input
        placeholder="Maksuyhteys (IBAN)"
        name="iban"
        value={biller.iban}
        onChange={handleBillerChange}
      />

      <label htmlFor="saveBiller">
        <input
          name="saveBiller"
          type="checkbox"
          checked={saveBiller}
          onChange={handleSaveBillerChange}
        />
        {' '}
        Tallenna maksutiedot selaimeesi
      </label>

      <button type="submit">Tallenna</button>
      <button type="button" onClick={clearBiller}>Poista maksutiedot</button>
    </form>
  );
};

BillerForm.propTypes = {
  biller: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    zipCode: PropTypes.string,
    postOffice: PropTypes.string,
    iban: PropTypes.string,
  }).isRequired,
  setBiller: PropTypes.func.isRequired,
  saveBiller: PropTypes.bool.isRequired,
  setSaveBiller: PropTypes.func.isRequired,
};

export default BillerForm;
