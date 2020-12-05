import React from 'react';
import { Select, Spin, Alert } from 'antd';
import styled from 'styled-components';
import AddNew from './components/AddNew';
import Option from './components/Option';
import withFetch from '../withFetch';

const FloatingAlert = styled(Alert)`
  position: absolute;
  z-index: 3;
  width: 100%;
`;
class DropdownPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      editing: null,
    };

    this.setEditing = this.setEditing.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.refreshAll = this.refreshAll.bind(this);
    this.dropdownRender = this.dropdownRender.bind(this);
  }

  componentDidMount() {
    this.refreshAll();
  }

  async refreshAll() {
    const { api } = this.props;
    const { data } = await api.getAll();
    
    this.setState({ data });
    return data;
  }

  setEditing(id) {
    this.setState({ editing: id });
  }

  add(value) {
    const { api, fetch } = this.props;

    try {
      fetch(() => api.add({ name: value }).then(this.refreshAll));
    } catch(err) {}
  }

  update(item, value) {
    const { api, fetch } = this.props;
    const { id, name, ...rest } = item;

    try {
      fetch(() => api.update(id, {
        ...rest,
        name: value,
      }).then(this.refreshAll));
    } catch(err) {}
  }

  async remove(item) {
    const { name, api, fetch, formRef, value } = this.props;

    try {
      await fetch(() => api.remove(item.id).then(this.refreshAll));
      item.name == value && formRef.current.setFieldsValue({ [name]: null });
    } catch(err) {}
  }

  dropdownRender(options) {
    const { loading, error } = this.props;

    return (
      <Spin spinning={loading}>
        {error ? (
          <FloatingAlert
            message={error}
            type="error"
            closable
            showIcon
          />
        ) : null}
        {options}
        <AddNew selectRef={this.select} maxLength={50} onAdd={this.add}/>
      </Spin>
    );
  };

  render() {
    const { placeholder, value, onChange } = this.props;
    const { data, editing } = this.state;

    return (
      <Select
        ref={(el) => this.select = el}
        placeholder={placeholder}
        allowClear
        showSearch
        optionLabelProp="value"
        value={value}
        onChange={onChange}
        filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        dropdownRender={this.dropdownRender}
      >
        {data.map((item) => (
          <Select.Option key={item.id} value={item.name} >
            <Option
              item={item}
              selectRef={this.select}
              editing={editing}
              setEditing={this.setEditing}
              onRemove={this.remove}
              onUpdate={this.update}
            />
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default withFetch(DropdownPicker);