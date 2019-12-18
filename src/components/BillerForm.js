import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

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

      <Input
        fluid
        placeholder="Nimi"
        name="name"
        value={biller.name}
        onChange={handleBillerChange}
      />

      <Input
        fluid
        placeholder="Osoite"
        name="address"
        value={biller.address}
        onChange={handleBillerChange}
      />

      <Input
        fluid
        placeholder="Postinumero"
        name="zipCode"
        value={biller.zipCode}
        onChange={handleBillerChange}
      />

      <Input
        fluid
        placeholder="Postitoimipaikka"
        name="postOffice"
        value={biller.postOffice}
        onChange={handleBillerChange}
      />

      <Input
        fluid
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
