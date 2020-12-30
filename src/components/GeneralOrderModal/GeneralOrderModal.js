import React from 'react';
import { Divider, Input, message, Modal } from 'antd';
import Form from '../Form';
import OrderedItemsTable from './components/OrderedItemsTable';
import Footer from './components/Footer';
import withFetch from '../withFetch';
import salesOrders from '../../apis/salesOrders';
import DropdownPicker from '../DropdownPicker';
import customers from '../../apis/customers';
import suppliers from '../../apis/suppliers';
class GeneralOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Items: [],
      totalPrice: 0,
    }

    this.formRef = React.createRef();

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
    const { onCancel, fetch, orderApi, refreshTableData } = this.props;

    values.createdTime = new Date();
    values.totalQuantity = Items.reduce((total, cur) => total + parseFloat(cur.quantity), 0);
    values.totalPrice = parseFloat(totalPrice);
    if (orderApi == salesOrders) {
      values.soldItems = Items.map((val) => ({ itemName: val.data.name, itemId: val.data.id, quantity: val.quantity, rate: val.rate }));
    } else {
      values.purchasedItems = Items.map((val) => ({ itemName: val.data.name, itemId: val.data.id, quantity: val.quantity, rate: val.rate }));
    }

    try {
      await fetch(() => orderApi.add(values));

      refreshTableData();
      message.success(`This Order has been added`);
      onCancel();
    } catch (err) {
      message.error(this.props.error);
    }
  }

  update = async values => {
    const { Items, totalPrice } = this.state;
    const { onCancel, fetch, orderApi, initialData, refreshTableData, refreshDetailsData } = this.props;
    const { id } = initialData;

    values.totalQuantity = Items.reduce((total, cur) => total + parseFloat(cur.quantity), 0);
    values.totalPrice = totalPrice;

    if (orderApi == salesOrders) {
      values.soldItems = Items.map((val) => ({ itemName: val.itemName, itemId: val.itemId, quantity: val.quantity, rate: val.rate }));
    } else {
      values.purchasedItems = Items.map((val) => ({ itemName: val.itemName, itemId: val.itemId, quantity: val.quantity, rate: val.rate }));
    }

    values = { ...initialData, ...values };

    try {
      if (orderApi == salesOrders) {
        await fetch(() => orderApi.update(id, values));
      } else {
        await fetch(() => orderApi.update(id, values));
      }

      refreshDetailsData();
      refreshTableData();
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
    const { onCancel, loading, error, initialData, fetch, fields, orderApi, ...props } = this.props;
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
            {orderApi == salesOrders ? <Form.Item
              label="Customer Name"
              name="customer"
              rules={[{
                required: true,
                message: 'Please select or add a customer',
              }]}
            >
              <DropdownPicker
                name="Customer"
                placeholder="Select a customer"
                api={customers}
                formRef={this.formRef}
              />
            </Form.Item> :
              <Form.Item
                label="Supplier Name"
                name="supplier"
                rules={[{
                  required: true,
                  message: 'Please select or add a supplier',
                }]}
              >
                <DropdownPicker
                  name="Supplier"
                  placeholder="Select a supplier"
                  api={suppliers}
                  formRef={this.formRef}
                />
              </Form.Item>}
            {Object.keys(fields).map((data) => (
              <Form.Item
                key={fields[data]}
                {...fields[data]}
                name={data}
              />
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
          <Footer loading={loading} onCancel={onCancel} />
        </Form>
      </Modal>
    );
  }
}

export default withFetch()(GeneralOrderModal);