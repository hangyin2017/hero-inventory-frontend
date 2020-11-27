import React from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import AddNew from './components/AddNew';
import Option from './components/Option';

class DropdownPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: null,
      editing: null,
    };

    this.setEditing = this.setEditing.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getData = this.getData.bind(this);
    this.dropdownRender = this.dropdownRender.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const { api } = this.props;
    const { data } = await api.getAll();
    this.setState({ data });
  }

  setEditing(id) {
    this.setState({ editing: id });
    console.log(this.state.editing);
  }

  add(value) {
    const { api } = this.props;
    api.add({ name: value }).then(this.getData);
  }

  update(id, value) {
    const { api } = this.props;
    api.update(id, { name: value }).then(this.getData);
  }

  delete(id) {
    const { api } = this.props;
    api.delete(id).then(this.getData);
  }

  dropdownRender(options) {
    return (
      <>
        {options}
        <AddNew maxLength={50} onAdd={this.add}/>
      </>
    );
  };

  render() {
    const { placeholder, ...selectProps } = this.props;
    const { data, editing } = this.state;

    return (
      <Select
        placeholder={placeholder}
        allowClear
        showSearch
        optionLabelProp="value"
        filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        dropdownRender={this.dropdownRender}
        {...selectProps}
        defaultOpen={true}
      >
        {data.map((item) => (
          <Select.Option key={item.id} value={item.name} >
            <Option
              item={item}
              onEdit={this.setEditing}
              onDelete={this.delete}
              editing={editing}
            />
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default DropdownPicker;