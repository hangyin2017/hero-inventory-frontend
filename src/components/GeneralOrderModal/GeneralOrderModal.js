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

    this.getItems = this.getItems.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  getItems = (Items) => {
    this.setState({
      Items
    })
  }

  add = async values => {
    const { Items, totalPrice } = this.state;
    const { onCancel, fetch, orderAPI } = this.props;

    values.createdTime = new Date();
    values.totalQuantity = Items.reduce((total, cur) => total + parseFloat(cur.QUANTITY), 0);
    values.totalPrice = parseFloat(totalPrice);
    if (orderAPI == salesOrders) {
      values.soldItems = Items.filter((item) => !!item.data.id)
        .map((val) => ({ itemName: val.data.name, itemId: val.data.id, quantity: val.QUANTITY, rate: val.RATE }));
    } else {
      values.purchasedItems = Items.filter((item) => !!item.data.id)
        .map((val) => ({ itemName: val.data.name, itemId: val.data.id, quantity: val.QUANTITY, rate: val.RATE }));
    }

    try {
      await fetch(() => orderAPI.add(values));

      message.success(`This Order has been added`);
      onCancel();
    } catch (err) {
      message.error(`Something went wrong while adding this order`)
    }
  }

  update = async values => {    
    const { Items, totalPrice } = this.state;
    const { onCancel, fetch, orderAPI, initialData } = this.props;
    const { id } = initialData;

    values.totalQuantity = Items.reduce((total, cur) => total + parseFloat(cur.QUANTITY), 0);
    values.totalPrice = totalPrice;
    if (orderAPI == salesOrders) {
      values.soldItems = Items.map((val) => ({ itemName: val.data.name, itemId: val.data.id, quantity: val.QUANTITY, rate: val.RATE }));
    } else {
      values.purchasedItems = Items.map((val) => ({ itemName: val.data.name, itemId: val.data.id, quantity: val.QUANTITY, rate: val.RATE }));
    }

    values = {...initialData, ...values};

    try {
      if (orderAPI == salesOrders) {
        await fetch(() => orderAPI.update(id, values));
      } else {
        await fetch(() => orderAPI.update(id, values));
      }
      message.success(`Order ${id} has been updated`);
      onCancel();
    } catch (err) {
      message.error(`Something went wrong while updating order ${id}`);
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
          initialValues={initialData}
          preserve={false}
          onFinish={initialData ? this.update : this.add}
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