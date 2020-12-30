import React from 'react';
import { Input, Divider, message } from 'antd';
import items from '../../../../apis/items';
import Modal from '../../../../components/Modal';
import Form from '../../../../components/Form';
import SimpleFooter from '../../../../components/Form/components/SimpleFooter';
import PrimaryInfo from './components/PrimaryInfo';
import CategoryInfo from './components/CategoryInfo';
import Pricing from './components/Pricing';
import Stock from './components/Stock';
import fields from '../../fields';
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

class NewItemModal extends React.Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();

    this.state = {
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  onSubmit() {
    this.formRef.current.submit();
  }

  async add(values) {
    const { onCancel, refreshTableData, fetch } = this.props;
    
    values.lastModifiedTime = values.createdTime = new Date();

    try {
      await fetch(() => items.add(values));

      refreshTableData();
      message.success(`Item ${values.name} has been added`);
      onCancel();
    } catch(err) {
      message.error(`Something went wrong while adding item ${values.name}`);
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
    const title = `${initialData ? "Edit" : "Add New"} Item`;

    return (
      <Modal
        {...props}
        title={title}
        width={1000}
        footer={null}
        onCancel={onCancel}
      >
        <Form
          labelCol={{ span: 6 }}
          ref={this.formRef}
          initialValues={initialData}
          onFinish={initialData ? this.update : this.add}
        >
          <PrimaryInfo formItems={formItems} />
          <Divider />
          <CategoryInfo formRef={this.formRef} formItems={formItems} />
          <Divider />
          <Pricing formItems={formItems} />
          {initialData ? (null) : (
            <>
              <Divider />
              <Stock formItems={formItems} />
            </>            
          )}
          <SimpleFooter loading={loading} onCancel={onCancel} onSubmit={this.onSubmit} />
        </Form>
      </Modal>
    );
  }
}

export default withFetch()(NewItemModal);