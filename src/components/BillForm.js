import React from 'react';
import PropTypes from 'prop-types';

import { emptyBillItem } from 'utils/config';

const BillForm = (props) => {
  const {
    bill,
    setBill,
    attachments,
    setAttachments,
  } = props;

  const countFromForm = (total, item) => {
    return typeof item.price === 'number'
      ? total + item.price
      : total;
  };

  const totalPrice = () => bill.items.reduce(countFromForm, 0);

  const handleChangeBillItemName = (changeIndex) => (event) => {
    const items = bill.items.map((item, index) => {
      return index === changeIndex
        ? { ...item, name: event.target.value }
        : item;
    });

    setBill({ ...bill, items });
  };

  const handleChangeBillItemPrice = (changeIndex) => (event) => {
    const price = event.target.value === ''
      ? ''
      : parseFloat(event.target.value);

    const items = bill.items.map((item, index) => {
      return index === changeIndex
        ? { ...item, price }
        : item;
    });

    setBill({ ...bill, items });
  };

  const handleAddBillItem = () => {
    const items = bill.items.concat(emptyBillItem);

    setBill({ ...bill, items });
  };

  const handleRemoveBillItem = (removeIndex) => () => {
    const items = bill.items.filter((item, index) => index !== removeIndex);

    setBill({ ...bill, items });
  };

  const handleFileChange = (event) => {
    setAttachments(event.target.files);
    console.log(attachments);
  };

  const submitBill = (event) => {
    event.preventDefault();
    console.log(bill);
  };

  const billItemsForm = bill.items.map((item, index) => (
    <tr key={index}>
      <td>
        <input
          type="text"
          placeholder="Nimi"
          value={item.name}
          onChange={handleChangeBillItemName(index)}
        />
      </td>

      <td>
        <input
          type="number"
          placeholder="Hinta"
          value={item.price}
          onChange={handleChangeBillItemPrice(index)}
        />
      </td>

      <td>
        <button type="button" onClick={handleRemoveBillItem(index)}>X</button>
      </td>
    </tr>
  ));

  return (
    <form onSubmit={submitBill}>
      <table>
        <thead>
          <tr>
            <th>Artikkeli</th>
            <th>Hinta (€)</th>
            <th>Poista</th>
          </tr>
        </thead>

        <tbody>
          {billItemsForm}
        </tbody>
      </table>

      <button type="button" onClick={handleAddBillItem}>+</button>
      <strong>Yhteensä: {totalPrice()} €</strong>

      <label htmlFor="attachments">
        Liitteet

        <input
          type="file"
          name="myFile"
          accept=".pdf, image/*"
          multiple
          onChange={handleFileChange}
        />
      </label>

      <button type="submit">Tallenna</button>
    </form>
  );
};

BillForm.propTypes = {
  bill: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
    })),
  }).isRequired,
  setBill: PropTypes.func.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.files).isRequired,
  setAttachments: PropTypes.func.isRequired,
};

export default BillForm;
