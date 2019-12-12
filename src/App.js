import React, { useState } from 'react';

import { newBiller } from 'utils/config';
import BillerForm from 'components/BillerForm';

function App() {
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
    </div>
  );
}

export default App;
