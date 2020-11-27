import React from 'react';
import { Modal, Divider, Input } from 'antd';
import Form from '../../../../components/Form';
import OrderedItemsTable from './components/OrderedItemsTable/OrderedItemsTable';
import Footer from './components/Footer';
import fields from './fields';

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
    const { TextArea } = Input;
    // const { } = this.state;

    return (
      <Modal
        {...props}
        title="Add New Sales Order"
        onCancel={onCancel}
        footer={null}
        width={1000}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          preserve={false}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Section>
            {fields.map((field) => (
              <Form.Item key={field.name} {...field}/>
            ))}
          </Form.Section>
          <Divider />
          <Form.Section>
            <OrderedItemsTable />
          </Form.Section>
          <Divider />
          <Form.Section>
            <Form.Item label="Comments" name="comments">
              <TextArea
                allowClear
                autoSize={{ minRows: 3}}
                maxLength={255}
                showCount
              />
            </Form.Item>
          </Form.Section>
          <Footer onCancel={onCancel}/>
        </Form>
      </Modal>
    );
  }
}

export default NewOrderModal;