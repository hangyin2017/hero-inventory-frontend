import React from 'react';
import Modal from '../../../../components/Modal';
import Form from '../../../../components/Form';
import SimpleFooter from '../../../../components/Form/components/SimpleFooter';

class NewOrderModal extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
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
        title="Add New Supplier"
        onCancel={onCancel}
        width={1000}
      >
        <Form
          labelCol={{ span: 6 }}
          preserve={false}
          // onFinish={this.onFinish}
          // onFinishFailed={this.onFinishFailed}
        >
          <SimpleFooter onCancel={onCancel}/>
        </Form>
      </Modal>
    );
  }
}

export default NewOrderModal;