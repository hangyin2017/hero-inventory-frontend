import React from 'react';
import { Modal, Input, Button, Form, DatePicker } from 'antd';
import moment from 'moment';

const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};

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
            <DatePicker defaultValue={moment('08/11/2020', 'DD/MM/YYYY')} format='DD/MM/YYYY' />
          </Form.Item>

          <Form.Item { ...tailLayout }>
            <Button style={{ margin: '0 8px' }}>
              Save as Draft
            </Button>
            <Button type="primary" htmlType="submit"  style={{ margin: '0 8px' }}>
              Save and Confirm
            </Button>
            <Button style={{ margin: '0 8px' }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default NewOrderModal;