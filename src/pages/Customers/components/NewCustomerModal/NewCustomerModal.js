import React from 'react';
import Modal from '../../../../components/Modal';
import Form from '../../../../components/Form';
import SimpleFooter from '../../../../components/Form/components/SimpleFooter';

class NewCustomerModal extends React.Component {
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
    const { hideModal, ...props } = this.props;
    // const { } = this.state;

    return (
      <Modal
        {...props}
        title="Add New Customer"
        hideModal={hideModal}
        width={1000}
      >
        <Form
          labelCol={{ span: 6 }}
          preserve={false}
          // onFinish={this.onFinish}
          // onFinishFailed={this.onFinishFailed}
        >
          <SimpleFooter onCancel={hideModal}/>
        </Form>
      </Modal>
    );
  }
}

export default NewCustomerModal;