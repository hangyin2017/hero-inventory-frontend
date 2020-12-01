import React from 'react';
import { Divider } from 'antd';
import Modal from '../../../../components/Modal';
import Form from '../../../../components/Form';
import SimpleFooter from '../../../../components/Form/components/SimpleFooter';
import PrimaryInfo from './components/PrimaryInfo';
import CategoryInfo from './components/CategoryInfo';
import Pricing from './components/Pricing';
import Stock from './components/Stock';

class NewOrderModal extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    // this.state = {
    // }
  }

  onFinish(values) {
    values.createdTime = new Date();
    console.log(values);
  };

  // onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  render() {
    const { onCancel, ...props } = this.props;
    // const { } = this.state;

    return (
      <Modal
        {...props}
        title="Add New Item"
        onCancel={onCancel}
        width={1000}
      >
        <Form
          labelCol={{ span: 6 }}
          ref={this.formRef}
          preserve={false}
          onFinish={this.onFinish}
          // onFinishFailed={this.onFinishFailed}
        >
          <PrimaryInfo />
          <Divider />
          <CategoryInfo formRef={this.formRef} />
          <Divider />
          <Pricing />
          <Divider />
          <Stock />
          <SimpleFooter onCancel={onCancel}/>
        </Form>
      </Modal>
    );
  }
}

export default NewOrderModal;