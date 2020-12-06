import React from 'react';
import { Modal, Divider, Input, Spin } from 'antd';
import Form from '../Form';
import OrderedItemsTable from './components/OrderedItemsTable';
import OrderFooter from './components/OrderFooter';
import salesOrderFields from './SalesorderFields';
import salesOrders from '../../apis/salesOrders';
import withFetch from '../withFetch';


class GeneralOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Items: [],
      visible: false,
      status: ''
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
    let data = {
      "salesorderNumber": values.salesOrder,
      "referenceNumber": values.salesReference,
      "date": values.salesOrderDate,
      "status": status,
      "shipmentDate": null,
      "invoicedStatus": null,
      "paidStatus": null,
      "shippedStatus": null,
      "createdTime": new Date(),
      "lastModifiedTime": null,
      "totalQuantity": Items.reduce((total, cur) => total + parseInt(cur.QUANTITY), 0),
      "comments": values.comments,
      "soldItems": Items.map((val) => ({ itemId: val.data.id, quantity: val.QUANTITY, rate: val.RATE }))
    }

    //加载状态的显示
    this.setState({ visible: true })
    //setTimeout(() => { this.setState({ visible: false }) }, 1000)

    const result = await salesOrders.add(data)
    if (result) {
      this.setState({ visible: false })
      this.props.onCancel();
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { onCancel, ...props } = this.props;
    const { TextArea } = Input;

    return (
      <Modal
        {...props}
        onCancel={onCancel}
        footer={null}
        {...props}
        title={'Add New Order'}
        onCancel={onCancel}
        width={1000}
      >
        <Modal
          closable={false}
          footer={null}
          visible={this.state.visible}
          mask={false}
          width={0}
        >
          <Spin size="large" />
        </Modal>

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          preserve={false}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Section>
            {salesOrderFields.map((field) => (
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
      </Modal>
    );
  }
}


export default withFetch(GeneralOrderModal);