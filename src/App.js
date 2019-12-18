import React, { useState } from 'react';

import { newBiller, emptyExpenses } from 'utils/config';
import totalPrice from 'utils/calculator';
import generatePdf from 'utils/generate-pdf';
import BillerForm from 'components/BillerForm';
import BillForm from 'components/BillForm';

function App() {
  const [expenses, setExpenses] = useState(emptyExpenses);
  const [expensesDescription, setExpensesDescription] = useState('');
  const [biller, setBiller] = useState(newBiller);
  const [attachments, setAttachments] = useState([]);
  const [saveBiller, setSaveBiller] = useState(false);

  const generateBill = () => {
    const bill = {
      biller,
      expenses,
      expensesDescription,
      expensesTotal: totalPrice(expenses),
      attachments: Array.from(attachments),
    };

    generatePdf(bill);
  };

  return (
    <div className="App">
      <h1>Satalinnan Säätiön kulukorvaukset</h1>

      <BillerForm
        biller={biller}
        setBiller={setBiller}
        saveBiller={saveBiller}
        setSaveBiller={setSaveBiller}
      />

      <BillForm
        expenses={expenses}
        setExpenses={setExpenses}
        expensesDescription={expensesDescription}
        setExpensesDescription={setExpensesDescription}
        attachments={attachments}
        setAttachments={setAttachments}
      />

      <button type="button" onClick={generateBill}>Luo lasku</button>
    </div>
  );
}

export default App;
