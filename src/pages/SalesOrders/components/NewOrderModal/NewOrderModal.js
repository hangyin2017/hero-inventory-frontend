import React from 'react';
import { Modal, Divider, Input, Spin } from 'antd';
import Form from '../../../../components/Form';
import OrderedItemsTable from './components/OrderedItemsTable/OrderedItemsTable';
import Footer from './components/Footer';
import fields from './fields';
import salesOrders from '../../../../apis/salesOrders';

class NewOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soldItems: [],
      visible: false,
      status:''
    }
  }

  getSoldItems = (soldItems) => {
    this.setState({
      soldItems
    })
  }

  setStatus = (status) => {
    this.setState({status})
  }
  
  onFinish = async values => {
    let data = {
      "salesorderNumber": values.salesOrder,
      "referenceNumber": values.reference,
      "date": values.salesOrderDate,
      "status": this.state.status,
      "shipmentDate": null,
      "invoicedStatus": null,
      "paidStatus": null,
      "shippedStatus": null,
      "createdTime": new Date(),
      "lastModifiedTime": null,
      "totalQuantity": this.state.soldItems.reduce((total, cur) => total + parseInt(cur.QUANTITY), 0),
      "comments": values.comments,
      "soldItems": this.state.soldItems.map((val) => ({ itemId: val.data.id, quantity: val.QUANTITY, rate: val.RATE }))
    }
    
    //加载状态的显示
    this.setState({ visible: true })
    //setTimeout(() => { this.setState({ visible: false }) }, 1000)

    const result = await salesOrders.add(data)
      if (result) {
        this.setState({ visible: false })
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
        { ...props }
        onCancel={ onCancel }
        footer={ null }
        width={1000}
      >
        <Modal
          closable={ false }
          footer={ null }
          visible={ this.state.visible }
          mask={ false }
          width={0}
        >
          <Spin size="large" />
        </Modal>

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          preserve={ false }
          onFinish={ this.onFinish }
          onFinishFailed={ this.onFinishFailed }
        >
          <Form.Section>
            { fields.map((field) => (
              <Form.Item key={ field.name } { ...field } />
            )) }
          </Form.Section>
          <Divider />
          <Form.Section>
            <OrderedItemsTable getSoldItems={ this.getSoldItems } />
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
          <Footer onCancel={ onCancel } setStatus={this.setStatus}/>
        </Form>
      </Modal>
    );
  }
}

export default NewOrderModal;