import React from 'react';
import { Input, Divider, message } from 'antd';
import Modal from '../../../../components/Modal';
import Form from '../../../../components/Form';
import fields from '../../fields';
import CustomerInfo from '../NewCustomerModal/components/CustomerInfo';
import ContactInfo from '../NewCustomerModal/components/ContactInfo';
import ActiveInfo from '../NewCustomerModal/components/ActiveInfo';
import SimpleFooter from '../../../../components/Form/components/SimpleFooter';
import withFetch from '../../../../components/withFetch';

const formItems = Object
  .keys(fields)
  .reduce((obj, key) => {
    const { label, component, required, ...restProps } = fields[key];
    const rules = required && [{ required: true }];

    return ({
      ...obj,
      [key]: (
        <Form.Item
          label={label}
          name={key}
          rules={rules}
          {...restProps}
        >
          {component || <Input />}
        </Form.Item>
      ),
    });
  }, {});

class NewCustomerModal extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();

    this.state = {
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    // this.state = {
    // }
  }

  onSubmit() {
    this.formRef.current.submit();
  }
  // onFinish = values => {
  //   console.log('Success:', values);
  // };

  // onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  async add(values) {
    const { onCancel, refreshTableData, fetch } = this.props;
    
    values.createdTime = new Date();

    try {
      await fetch(() => items.add(values));

      refreshTableData();
      message.success(`Customer ${values.name} has been added`);
      onCancel();
    } catch(err) {
      message.error(`Something went wrong while adding customer ${values.name}`);
    }
  };

  async update(values) {
    const { initialData, onCancel, refreshTableData, refreshDetailsData, fetch } = this.props;
    const { id } = initialData;
    
    values.lastModifiedTime = new Date();
    values = {...initialData, ...values};

    try {
      await fetch(() => items.update(id, values));

      refreshDetailsData();
      refreshTableData();
      message.success(`Item ${values.name} has been updated`);
      onCancel();
    } catch(err) {
      message.error(`Something went wrong while updating item ${values.name}`);
    }
  }

  render() {
    const { initialData, onCancel, loading, error, fetch, ...props } = this.props;
    const title = `${initialData ? "Edit" : "Add New"} Customer`;
    // const { } = this.state;

    return (
      <Modal
        {...props}
        title={title}
        onCancel={onCancel}
        width={1000}
        footer={null}
      >
        <Form
          labelCol={{ span: 7 }}
          ref={this.formRef}
          initialValues={initialData}
          onFinish={initialData ? this.update : this.add}
        >
          <CustomerInfo formItems={formItems} />
          <Divider />
          <ContactInfo formItems={formItems} />
          {/* <Divider />
          <ActiveInfo formItems={formItems} /> */}
          <SimpleFooter loading={loading} onCancel={onCancel} onSubmit={this.onSubmit}/>
        </Form>
      </Modal>
    );
  }
}

export default withFetch(NewCustomerModal);