import React, { useState } from 'react';

const BILLER = 'biller';

const emptyBiller = {
  name: '',
  address: '',
  zipCode: '',
  postOffice: '',
  iban: '',
};

const newBiller = JSON.parse(window.localStorage.getItem(BILLER)) || emptyBiller;

const ExpenseForm = () => {
  const [biller, setBiller] = useState(newBiller);
  const [saveToStore, setSaveToStore] = useState(false);

  const handleBillerChange = (event) => {
    setBiller({ ...biller, [event.target.name]: event.target.value });
  };

  const handleSaveToStoreChange = (event) => {
    setSaveToStore(event.target.checked);
  };

  const saveBiller = (event) => {
    event.preventDefault();

    if (saveToStore) {
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
    <form onSubmit={saveBiller}>
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

      <label htmlFor="saveToStore">
        <input
          name="saveToStore"
          type="checkbox"
          checked={saveToStore}
          onChange={handleSaveToStoreChange}
        />
        {' '}
        Tallenna maksutiedot selaimeesi
      </label>

      <button type="submit">Tallenna</button>
      <button type="button" onClick={clearBiller}>Poista maksutiedot</button>
    </form>
  );
};

export default ExpenseForm;
