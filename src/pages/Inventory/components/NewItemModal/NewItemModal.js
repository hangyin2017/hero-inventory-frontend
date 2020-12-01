import React from 'react';
import { Divider, message } from 'antd';
import items from '../../../../apis/items';
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

    this.state = {
      loading: false,
    }

    this.submit = this.submit.bind(this);
  }

  async submit(values) {
    const { hideModal } = this.props;
    
    values.createdTime = new Date();

    this.setState({ loading: true });

    try {
      await items.add(values);

      // this.setState({ loading: false });
      message.success(`Item ${values.name} has been added`);
      hideModal();
    } catch(err) {
      message.error(`Something went wrong while adding item ${values.name}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { hideModal, ...props } = this.props;
    const { loading } = this.state;

    return (
      <Modal
        {...props}
        title="Add New Item"
        width={1000}
        hideModal={hideModal}
      >
        <Form
          labelCol={{ span: 6 }}
          ref={this.formRef}
          onFinish={this.submit}
        >
          <PrimaryInfo />
          <Divider />
          <CategoryInfo formRef={this.formRef} />
          <Divider />
          <Pricing />
          <Divider />
          <Stock />
          <SimpleFooter loading={loading} onCancel={hideModal} />
        </Form>
      </Modal>
    );
  }
}

export default NewOrderModal;