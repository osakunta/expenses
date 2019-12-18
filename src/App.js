import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Form,
  Header,
} from 'semantic-ui-react';

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
    <Container>
      <Divider hidden />

      <Header as="h1">Satalinnan Säätiön kulukorvaukset</Header>

      <Divider hidden />

      <Form>
        <BillerForm
          biller={biller}
          setBiller={setBiller}
        />
        <Divider hidden />

        <BillForm
          expenses={expenses}
          setExpenses={setExpenses}
          expensesDescription={expensesDescription}
          setExpensesDescription={setExpensesDescription}
          attachments={attachments}
          setAttachments={setAttachments}
        />

        <Divider hidden />

        <Checkbox
          toggle
          checked={saveBiller}
          onChange={handleSaveBillerChange}
          name="saveBiller"
          label="Tallenna maksutiedot selaimeesi"
        />

        <Divider hidden />

        <Button fluid primary onClick={generateBill}>Luo lasku</Button>
      </Form>

      <Divider hidden />
    </Container>
  );
}

export default App;
