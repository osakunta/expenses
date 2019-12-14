import React, { useState } from 'react';

import { newBiller, emptyExpenses } from 'utils/config';
import BillerForm from 'components/BillerForm';
import BillForm from 'components/BillForm';

function App() {
  const [expenses, setExpenses] = useState(emptyExpenses);
  const [biller, setBiller] = useState(newBiller);
  const [attachments, setAttachments] = useState([]);
  const [saveBiller, setSaveBiller] = useState(false);

  return (
    <div className="App">
      Satalinna Foundation Expenses
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
        attachments={attachments}
        setAttachments={setAttachments}
      />
    </div>
  );
}

export default App;
