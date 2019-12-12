import React, { useState } from 'react';

import { newBiller, emptyBill } from 'utils/config';
import BillerForm from 'components/BillerForm';
import BillForm from 'components/BillForm';

function App() {
  const [bill, setBill] = useState(emptyBill);
  const [biller, setBiller] = useState(newBiller);
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
        bill={bill}
        setBill={setBill}
      />
    </div>
  );
}

export default App;
