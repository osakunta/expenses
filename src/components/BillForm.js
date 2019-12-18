import React from 'react';
import PropTypes from 'prop-types';

import { emptyExpense } from 'utils/config';
import totalPrice from 'utils/calculator';

const BillForm = (props) => {
  const {
    expenses,
    setExpenses,
    expensesDescription,
    setExpensesDescription,
    attachments,
    setAttachments,
  } = props;

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

  const handleChangeExpensesDescription = (event) => {
    setExpensesDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setAttachments(event.target.files);
    console.log(attachments);
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
    <form>
      <h2>Kulut</h2>

      <label htmlFor="description">
        <h3>Selitys</h3>

        <textarea
          name="description"
          rows="5"
          cols="80"
          value={expensesDescription}
          onChange={handleChangeExpensesDescription}
        />
      </label>

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
      <strong>Yhteensä: {totalPrice(expenses)} €</strong>

      <label htmlFor="attachments">
        <h2>Liitteet</h2>

        <input
          name="attachments"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </label>
    </form>
  );
};

BillForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  setExpenses: PropTypes.func.isRequired,
  expensesDescription: PropTypes.string.isRequired,
  setExpensesDescription: PropTypes.func.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.files).isRequired,
  setAttachments: PropTypes.func.isRequired,
};

export default BillForm;
