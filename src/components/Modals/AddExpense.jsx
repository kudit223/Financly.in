import React from "react";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";

function AddExpense({ isExpenseModalVisible, handleExpenseCancel, onFinish }) {
  const [form] = Form.useForm();
  return (
    <Modal
      open={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      title="Add Expense"
      style={{ fontWeight: 500 }}
      footer={null}
    >
      <Form
        variant="underlined"
        layout="vertical"
        form={form}
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the expense of the transaction!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select the expense date!",
            },
          ]}
        >
          <DatePicker className="w-100" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please select a tag!",
            },
          ]}
        >
          <Select>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="office">Office</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" className="w-100" htmlType="submit">
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpense;
