import React, { useState } from 'react';

import { BILLER, newBiller, emptyExpenses } from 'utils/config';
import totalPrice from 'utils/calculator';
import generatePdf from 'utils/generate-pdf';
import BillerForm from 'components/BillerForm';
import BillForm from 'components/BillForm';

function App() {
  const [expenses, setExpenses] = useState(emptyExpenses);
  const [expensesDescription, setExpensesDescription] = useState('');
  const [biller, setBiller] = useState(newBiller);
  const [attachments, setAttachments] = useState([]);
  const [saveBiller, setSaveBiller] = useState(!!window.localStorage.getItem(BILLER));

  const handleSaveBillerChange = (event) => {
    setSaveBiller(event.target.checked);
  };

  const generateBill = () => {
    const bill = {
      biller,
      expenses,
      expensesDescription,
      expensesTotal: totalPrice(expenses),
      attachments: Array.from(attachments),
    };

    if (saveBiller) {
      window.localStorage.setItem(BILLER, JSON.stringify(biller));
    } else {
      window.localStorage.removeItem(BILLER);
    }

    generatePdf(bill);
  };

  return (
    <div className="App">
      <h1>Satalinnan Säätiön kulukorvaukset</h1>

      <BillerForm
        biller={biller}
        setBiller={setBiller}
      />

      <BillForm
        expenses={expenses}
        setExpenses={setExpenses}
        expensesDescription={expensesDescription}
        setExpensesDescription={setExpensesDescription}
        attachments={attachments}
        setAttachments={setAttachments}
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

      <button type="button" onClick={generateBill}>Luo lasku</button>
    </div>
  );
}

export default App;
