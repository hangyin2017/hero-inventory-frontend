import React from 'react';
import { Modal, Input, Button, Form, DatePicker, Divider } from 'antd';
import moment from 'moment';
import FormFooter from './components/FormFooter';


class NewOrderModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    }
  }

  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { title, visible, onSave, onCancel } = this.props;
    // const { } = this.state;

    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
        footer={null}
        maskClosable={false}
        width={1000}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 8,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Customer Name"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input customer name',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sales Order#"
            name="salesOrder"
            rules={[
              {
                required: true,
                message: 'Please input sales order number',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Reference#">
            <Input />
          </Form.Item>

          <Form.Item
            label="Sales Order Date"
            name="salesOrderDate"
            rules={[
              {
                required: true,
                message: 'Please pick a sales order date',
              },
            ]}
          >
            <DatePicker defaultValue={moment()} format="DD/MM/YYYY" />
          </Form.Item>

          <Divider />

          <FormFooter />
        </Form>
      </Modal>
    );
  }
}

export default NewOrderModal;