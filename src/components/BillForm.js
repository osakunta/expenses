import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Divider,
  Header,
  Icon,
  Input,
  Table,
  TextArea,
} from 'semantic-ui-react';

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
    const price = event.target.value;

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
    <Table.Row key={index}>
      <Table.Cell>
        <Input
          fluid
          type="text"
          placeholder="Nimi"
          value={item.name}
          onChange={handleChangeExpenseName(index)}
        />
      </Table.Cell>

      <Table.Cell>
        <Input
          fluid
          type="text"
          placeholder="Hinta"
          value={item.price}
          onChange={handleChangeExpensePrice(index)}
        />
      </Table.Cell>

      <Table.Cell collapsing>
        <Button onClick={handleRemoveExpense(index)}>
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Header as="h2">Kulut</Header>

      <Header as="h3">Selitys</Header>

      <TextArea
        name="description"
        value={expensesDescription}
        onChange={handleChangeExpensesDescription}
      />

      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Artikkeli</Table.HeaderCell>
            <Table.HeaderCell width={4}>Hinta (EUR)</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {expensesForm}

          <Table.Row>
            <Table.Cell colSpan="3">
              <Button fluid onClick={handleAddExpense}>Lisää rivi</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>
              Yhteensä
            </Table.HeaderCell>

            <Table.HeaderCell>
              {totalPrice(expenses)}
            </Table.HeaderCell>

            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
      </Table>

      <Divider hidden />

      <Header as="h2">Liitteet</Header>

      <Input
        fluid
        name="attachments"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
    </>
  );
};

BillForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
  })).isRequired,
  setExpenses: PropTypes.func.isRequired,
  expensesDescription: PropTypes.string.isRequired,
  setExpensesDescription: PropTypes.func.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.files).isRequired,
  setAttachments: PropTypes.func.isRequired,
};

export default BillForm;
