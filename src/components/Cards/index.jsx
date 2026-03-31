import { Row, Col, Card, Button } from "antd";
import React from "react";
import "./card.css";

function Cards({showIncomeModal,showExpenseModal,currentBalance,totalIncome,totalExpense}) {
  return (
    <div className="">
      <Row
        className="d-flex flex-lg-row flex-column justify-content-md-between align-items-center mx-2 mt-4 gap-3"
        gutter={16}
      >
        <Col>
          <Card className="my-card">
            <h4 className="fw-bold my-3">Current Balance</h4>
            <p>₹{currentBalance}</p>
            <Button className="w-100" type="primary">
              Reset Balance
            </Button>
          </Card>
        </Col>
        <Col>
          <Card className="my-card" >
            <h4 className="fw-bold my-3">Total Income </h4>
            <p>₹{totalIncome}</p>
            <Button className="w-100" type="primary" onClick={showIncomeModal}>
              Add Income
            </Button>
          </Card>
        </Col>

        <Col>
          <Card className="my-card" >
            <h4  className="fw-bold my-3">Total Expense</h4>
            <p>₹{totalExpense}</p>
            <Button className="w-100" type="primary" onClick={showExpenseModal}>
              Add Expense
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cards;
