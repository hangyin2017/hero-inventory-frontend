import React from 'react';
import { Modal, Divider, Input, Spin } from 'antd';
import Form from '../../../../components/Form';
import OrderedItemsTable from './components/OrderedItemsTable/OrderedItemsTable';
import Footer from './components/Footer';
import fields from './fields';

class NewOrderModal extends React.Component {
  constructor(props) {
    super(props);
    // 声明状态，一个是orderedItemsTable的，一个是请求中状态的
    this.state = {
      soldItems: [],
      visible: false
    }
  }
  getSoldItems = (soldItems) => {
    this.setState({
      soldItems
    })
  }
  onFinish = values => {
    // 只要一点save按钮，visible设为true，加载状态出现
    this.setState({ visible: true })
    // 临时模拟请求延时，请求结束，visible设为false，加载状态消失
    setTimeout(() => { this.setState({ visible: false }) }, 1000)
    // 底下这个对象是所有的数据
    console.log('Success:', { ...values, soldItems: this.state.soldItems });
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
        width={ 1000 }
      >
        <Modal
          closable={ false }
          footer={ null }
          visible={ this.state.visible }
          mask={ false }
          width={ 0 }
        >
        {/* 这个modal是发请求的请求中的状态，由visible这个状态控制 */}
          <Spin size="large" />
        </Modal>

        <Form
          labelCol={ { span: 4 } }
          wrapperCol={ { span: 12 } }
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
            {/* 给OrderedItemsTable 组件传递一个函数，把OrderedItemsTable组件的数据往上传递到当前组件*/}
            <OrderedItemsTable getSoldItems={ this.getSoldItems } />
          </Form.Section>
          <Divider />
          <Form.Section>
            <Form.Item label="Comments" name="comments">
              <TextArea
                allowClear
                autoSize={ { minRows: 3 } }
                maxLength={ 255 }
                showCount
              />
            </Form.Item>
          </Form.Section>
          <Footer onCancel={ onCancel } />
        </Form>
      </Modal>
    );
  }
}

export default NewOrderModal;