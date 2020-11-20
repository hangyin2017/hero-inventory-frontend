import React from 'react';
import { Modal, Form, Divider } from 'antd';
import OrderedItemsTable from './components/OrderedItemsTable/OrderedItemsTable';
import FormFooter from './components/FormFooter';
import FIELDS from './FIELDS';

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
    const { onCancel, ...props } = this.props;
    // const { } = this.state;

    return (
      <Modal
        {...props}
        onCancel={onCancel}
        footer={null}
        width={1000}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          preserve={false}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          {FIELDS.map((field) => (
            <Form.Item key={field.name} {...field}/>
          ))}
          <Divider />
          <OrderedItemsTable />
          <FormFooter onCancel={onCancel}/>
        </Form>
      </Modal>
    );
  }
}

export default NewOrderModal;