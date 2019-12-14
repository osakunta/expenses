import React, { useState } from 'react';

import { newBiller, emptyExpenses } from 'utils/config';
import BillerForm from 'components/BillerForm';
import BillForm from 'components/BillForm';

function App() {
  const [expenses, setExpenses] = useState(emptyExpenses);
  const [expensesDescription, setExpensesDescription] = useState('');
  const [biller, setBiller] = useState(newBiller);
  const [attachments, setAttachments] = useState([]);
  const [saveBiller, setSaveBiller] = useState(false);

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
        biller={biller}
        expenses={expenses}
        setExpenses={setExpenses}
        expensesDescription={expensesDescription}
        setExpensesDescription={setExpensesDescription}
        attachments={attachments}
        setAttachments={setAttachments}
      />
    </div>
  );
}

export default App;
