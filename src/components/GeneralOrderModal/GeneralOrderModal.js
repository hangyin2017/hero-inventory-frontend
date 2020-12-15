import React from 'react';
import { Divider, Input, message, Modal } from 'antd';
import Form from '../Form';
import OrderedItemsTable from './components/OrderedItemsTable';
import Footer from './components/Footer';
import withFetch from '../withFetch';
import salesOrders from '../../apis/salesOrders';

class GeneralOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Items: [],
      totalPrice: 0,
    }
  }

  getItems = (Items) => {
    this.setState({
      Items
    })
  }

  onFinish = async values => {
    const { Items, totalPrice } = this.state;
    const { onCancel, fetch, orderAPI } = this.props;

    values.createdTime = new Date();
    values.totalQuantity = Items.reduce((total, cur) => total + parseInt(cur.QUANTITY), 0);
    values.totalPrice = totalPrice;
    if (orderAPI == salesOrders) {
      values.soldItems = Items.map((val) => ({ itemName: val.data.name, itemId: val.data.id, quantity: val.QUANTITY, rate: val.RATE }));
    } else {
      values.purchasedItems = Items.map((val) => ({ temName: val.data.name, itemId: val.data.id, quantity: val.QUANTITY, rate: val.RATE }));
    }

    try {
      await fetch(() => orderAPI.add(values));

      message.success(`This Order has been added`);
      onCancel();
    } catch (err) {
      message.error(`Something went wrong while adding this order`)
    }
  }

  getTotalPrice = (totalPrice) => {
    this.setState({
      totalPrice
    })
  }

  render() {
    const { onCancel, loading, error, initialData, fetch, fields, ...props } = this.props;
    const { TextArea } = Input;

    return (
      <Modal
        {...props}
        onCancel={onCancel}
        footer={null}
        title={initialData ? 'Edit Order' : 'Add New Order'}
        width={1000}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          initialValues={initialData ? initialData : null}
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
            <OrderedItemsTable 
              initialData={initialData ? initialData.purchasedItems || initialData.soldItems : null}
              getItems={this.getItems}
              getTotalPrice={this.getTotalPrice} />
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