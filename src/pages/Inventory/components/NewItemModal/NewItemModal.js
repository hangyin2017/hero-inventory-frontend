import React from 'react';
import { Modal, Form, Divider } from 'antd';
import FormFooter from './components/FormFooter';
import PrimaryInfo from './components/PrimaryInfo';
import CategoryInfo from './components/CategoryInfo';
import Pricing from './components/Pricing';
import Stock from './components/Stock';

class NewOrderModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    }
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
        onCancel={onCancel}
        footer={null}
        destroyOnClose={true}
        width={1000}
      >
        <Form
          labelCol={{ span: 6 }}
          // wrapperCol={{ span: 8 }}
          preserve={false}
          // onFinish={this.onFinish}
          // onFinishFailed={this.onFinishFailed}
        >
          {/* {fields.map((section, index) => {
            const formSection = section.map((field) => (
              <Form.Item key={field.name} {...field}/>
            ));
            (index < fields.length - 1) &&
              formSection.push(<Divider />);
            return formSection;
          })} */}
          <PrimaryInfo />
          <Divider />
          <CategoryInfo />
          <Divider />
          <Pricing />
          <Divider />
          <Stock />
          <FormFooter onCancel={onCancel}/>
        </Form>
      </Modal>
    );
  }
}

export default NewOrderModal;