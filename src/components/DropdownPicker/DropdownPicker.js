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
  }

  setEditing(id) {
    this.setState({ editing: id });
  }

  add(value) {
    const { api } = this.props;
    api.add({ name: value }).then(this.refreshAll);
  }

  async update(id, value) {
    const { api } = this.props;
    await api.update(id, { name: value });
    this.setState({
      editing: null,
    });
    this.refreshAll();
  }

  remove(id) {
    const { api } = this.props;
    api.delete(id).then(this.refreshAll);
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
    const { api, placeholder, ...selectProps } = this.props;
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
              setEditing={this.setEditing}
              remove={this.remove}
              editing={editing}
              update={this.update}
            
            // {editiong === item.id && onClick: {(e) => e.stopPropagation()}}
            />
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default DropdownPicker;