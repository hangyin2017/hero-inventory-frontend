import React from 'react';
import { Divider, Input, message, Modal } from 'antd';
import Form from '../Form';
import OrderedItemsTable from './components/OrderedItemsTable';
import Footer from './components/Footer';
import withFetch from '../withFetch';
import salesOrder from '../../apis/salesOrders';

class GeneralOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Items: [],
    }
  }

  getItems = (Items) => {
    this.setState({
      Items
    })
  }

  onFinish = async values => {
    const { Items } = this.state;
    const { onCancel, fetch, orderAPI } = this.props;

    values.createdTime = new Date();
    values.totalQuantity = Items.reduce((total, cur) => total + parseInt(cur.QUANTITY), 0);
    if (orderAPI == salesOrder) {
      values.soldItems = Items.map((val) => ({ itemId: val.data.id, quantity: val.QUANTITY, rate: val.RATE }));
    } else {
      values.purchasedItems = Items.map((val) => ({ itemId: val.data.id, quantity: val.QUANTITY, rate: val.RATE }));
    }

    try {
      await fetch(() => orderAPI.add(values));

      message.success(`This Order has been added`);
      onCancel();
    } catch (err) {
      message.error(`Something went wrong while adding this order`)
    }
  }

  render() {
    const { onCancel, loading, error, fetch, fields, ...props } = this.props;
    const { TextArea } = Input;

    return (
      <Modal
        {...props}
        onCancel={onCancel}
        footer={null}
        title={'Add New Order'}
        width={1000}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          preserve={false}
          onFinish={this.onFinish}
        >
          <Form.Section>
            {Object.keys(fields).map((key) => (
              <Form.Item key={fields[key]} {...fields[key]} name={key} />
            ))}
          </Form.Section>
          <Divider />
          <Form.Section>
            <OrderedItemsTable getItems={this.getItems} />
          </Form.Section>
          <Divider />
          <Form.Section>
            <Form.Item label="Comments" name="comments">
              <TextArea
                allowClear
                autoSize={{ minRows: 3 }}
                maxLength={255}
                showCount
              />
            </Form.Item>
          </Form.Section>
          <Footer onCancel={onCancel} />
        </Form>
      </Modal>
    );
  }
}


export default withFetch(GeneralOrderModal);