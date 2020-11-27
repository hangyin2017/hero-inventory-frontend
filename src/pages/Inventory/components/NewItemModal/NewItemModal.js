import React from 'react';
import { Modal, Form, Divider } from 'antd';
import Footer from './components/Footer';
import PrimaryInfo from './components/PrimaryInfo';
import CategoryInfo from './components/CategoryInfo';
import Pricing from './components/Pricing';
import Stock from './components/Stock';

class NewOrderModal extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   brands: [],
    //   manufacturers: [],
    // }
  }

  // onFinish = values => {
  //   console.log('Success:', values);
  // };

  // onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  render() {
    const { onCancel, ...modalProps } = this.props;
    // const { } = this.state;

    return (
      <Modal
        {...modalProps}
        title="Add New Item"
        onCancel={onCancel}
        footer={null}
        width={1000}
      >
        <Form
          labelCol={{ span: 6 }}
          preserve={false}
          // onFinish={this.onFinish}
          // onFinishFailed={this.onFinishFailed}
        >
          <PrimaryInfo />
          <Divider />
          <CategoryInfo />
          <Divider />
          <Pricing />
          <Divider />
          <Stock />
          <Footer onCancel={onCancel}/>
        </Form>
      </Modal>
    );
  }
}

export default NewOrderModal;