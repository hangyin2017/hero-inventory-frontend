import React from 'react';
import { Divider, Input } from 'antd';
import Form from '../Form';
import OrderedItemsTable from './components/OrderedItemsTable';
import OrderFooter from './components/OrderFooter';
import withFetch from '../withFetch';
import salesOrder from '../../apis/salesOrders';
import purchaseOrder from '../../apis/purchaseOrders';


class GeneralOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Items: [],
      visible: false,
      status: '',
    }
  }

  getItems = (Items) => {
    this.setState({
      Items
    })
  }

  setStatus = (status) => {
    this.setState({ status })
  }

  onFinish = async values => {
    const { status, Items } = this.state;
    const { orderAPI } = this.props;
    let data = [];
    if (orderAPI == salesOrder) {
      data = {
        "salesorderNumber": values.salesOrder,
        "referenceNumber": values.salesReference,
        "date": values.salesOrderDate,
        "status": status,
        "createdTime": new Date(),
        "totalQuantity": Items.reduce((total, cur) => total + parseInt(cur.QUANTITY), 0),
        "comments": values.comments,
        "soldItems": Items.map((val) => ({ itemId: val.data.id, quantity: val.QUANTITY, rate: val.RATE })),
      }
    } else if (orderAPI == purchaseOrder) {
      data = {
        "purchaseOrderNumber": values.purchaseOrder,
        "referenceNumber": values.purchaseReference,
        "date": values.purchaseOrderDate,
        "createdTime": new Date(),
        "totalQuantity": Items.reduce((total, cur) => total + parseInt(cur.QUANTITY), 0),
        "comments": values.comments,
        "purchasedItems": Items.map((val) => ({ itemId: val.data.id, quantity: val.QUANTITY, rate: val.RATE })),
      }
    }
    
    //加载状态的显示
    this.setState({ visible: true })
    //setTimeout(() => { this.setState({ visible: false }) }, 1000)

    const result = await orderAPI.add(data)
    if (result) {
      this.setState({ visible: false })
      this.props.onCancel();
    } 
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { onCancel } = this.props;
    const { TextArea } = Input;

    return (
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        preserve={false}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Section>
          {this.props.fields.map((field) => (
            <Form.Item key={field.name} {...field} />
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
        <OrderFooter onCancel={onCancel} setStatus={this.setStatus} />
      </Form>
    );
  }
}


export default withFetch(GeneralOrderModal);