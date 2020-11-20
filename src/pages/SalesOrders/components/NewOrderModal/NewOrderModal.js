import React from 'react';
import { Modal, Input, Button, Form, DatePicker, Divider } from 'antd';
import OrderedItemsTable from './components/OrderedItemsTable';
import FormFooter from './components/FormFooter';
import { FIELDS } from './FIELDS';

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
          {FIELDS.map((field) => (
            <Form.Item key={field.name} {...field}/>
          ))}
          <Divider />
          <OrderedItemsTable />
          <FormFooter />
        </Form>
      </Modal>
    );
  }
}

export default NewOrderModal;