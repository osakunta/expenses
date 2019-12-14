import React from 'react';
import PropTypes from 'prop-types';

import { emptyExpense } from 'utils/config';

const BillForm = (props) => {
  const {
    expenses,
    setExpenses,
    attachments,
    setAttachments,
  } = props;

  const countFromForm = (total, expense) => {
    return typeof expense.price === 'number'
      ? total + expense.price
      : total;
  };

  const totalPrice = () => expenses.reduce(countFromForm, 0);

  const handleChangeExpenseName = (changeIndex) => (event) => {
    const newExpenses = expenses.map((expense, index) => {
      return index === changeIndex
        ? { ...expense, name: event.target.value }
        : expense;
    });

    setExpenses(newExpenses);
  };

  const handleChangeExpensePrice = (changeIndex) => (event) => {
    const price = event.target.value === ''
      ? ''
      : parseFloat(event.target.value);

    const newExpenses = expenses.map((expense, index) => {
      return index === changeIndex
        ? { ...expense, price }
        : expense;
    });

    setExpenses(newExpenses);
  };

  const handleAddExpense = () => {
    const newExpenses = expenses.concat(emptyExpense);

    setExpenses(newExpenses);
  };

  const handleRemoveExpense = (removeIndex) => () => {
    const newExpenses = expenses.filter((expense, index) => index !== removeIndex);

    setExpenses(newExpenses);
  };

  const handleFileChange = (event) => {
    setAttachments(event.target.files);
    console.log(attachments);
  };

  const submitExpenses = (event) => {
    event.preventDefault();
    console.log(expenses);
  };

  const expensesForm = expenses.map((item, index) => (
    <tr key={index}>
      <td>
        <input
          type="text"
          placeholder="Nimi"
          value={item.name}
          onChange={handleChangeExpenseName(index)}
        />
      </td>

      <td>
        <input
          type="number"
          placeholder="Hinta"
          value={item.price}
          onChange={handleChangeExpensePrice(index)}
        />
      </td>

      <td>
        <button type="button" onClick={handleRemoveExpense(index)}>X</button>
      </td>
    </tr>
  ));

  return (
    <form onSubmit={submitExpenses}>
      <h2>Kulut</h2>

      <table>
        <thead>
          <tr>
            <th>Artikkeli</th>
            <th>Hinta (€)</th>
            <th>Poista</th>
          </tr>
        </thead>

        <tbody>
          {expensesForm}
        </tbody>
      </table>

      <button type="button" onClick={handleAddExpense}>+</button>
      <strong>Yhteensä: {totalPrice()} €</strong>

      <label htmlFor="attachments">
        <h2>Liitteet</h2>

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
  expenses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  setExpenses: PropTypes.func.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.files).isRequired,
  setAttachments: PropTypes.func.isRequired,
};

export default BillForm;
