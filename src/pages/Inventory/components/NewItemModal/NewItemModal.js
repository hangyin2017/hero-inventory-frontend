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
import fields from './fields';

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
      loading: false,
    }

    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { editing, data } = this.props;
    // if(editing && data !== prevProps.data) {
      // this.formRef.current.setFieldsValue(data);
    // }
  }

  async add(values) {
    const { hideModal } = this.props;
    
    values.createdTime = new Date();

    this.setState({ loading: true });

    try {
      await items.add(values);

      message.success(`Item ${values.name} has been added`);
      hideModal();
    } catch(err) {
      message.error(`Something went wrong while adding item ${values.name}`);
    } finally {
      this.setState({ loading: false });
    }
  };

  async update(values) {
    const { data, hideModal } = this.props;
    
    values.lastModifiedTime = new Date();

    this.setState({ loading: true });

    try {
      await items.update(data.id, values);

      message.success(`Item ${values.name} has been updated`);
      // hideModal();
    } catch(err) {
      message.error(`Something went wrong while updating item ${values.name}`);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { editing, data, onCancel, ...props } = this.props;
    const { loading } = this.state;

    const title = `${editing ? "Edit" : "Add New"} Item`;

    return (
      <Modal
        {...props}
        title={title}
        width={1000}
        onCancel={onCancel}
      >
        <Form
          labelCol={{ span: 6 }}
          ref={this.formRef}
          onFinish={editing ? this.update : this.add}
        >
          <PrimaryInfo formItems={formItems} />
          <Divider />
          <CategoryInfo formRef={this.formRef} formItems={formItems} />
          <Divider />
          <Pricing formItems={formItems} />
          {editing ? (null) : (
            <>
              <Divider />
              <Stock formItems={formItems} />
            </>            
          )}
          <SimpleFooter loading={loading} onCancel={onCancel} />
        </Form>
      </Modal>
    );
  }
}

export default NewItemModal;