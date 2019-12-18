import React from 'react';
import PropTypes from 'prop-types';

const BillerForm = (props) => {
  const {
    biller,
    setBiller,
  } = props;

  const handleBillerChange = (event) => {
    setBiller({ ...biller, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h2>Omat tiedot</h2>

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
    </>
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
};

export default BillerForm;
