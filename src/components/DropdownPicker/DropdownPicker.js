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
    this.setState({ value });
  }

  async update(item, value) {
    const { api } = this.props;
    const { editing } = this.state;
    if(item.id === editing) {
      this.setState({
        value,
      });
    }
    await api.update(item.id, { name: value });
    this.refreshAll();
  }

  remove(item) {
    const { api } = this.props;
    const { value } = this.state;

    this.select.focus();

    api.delete(item.id).then(this.refreshAll);

    if(item.name == value) this.setState({ value: null });
  }

  dropdownRender(options) {
    return (
      <>
        {options}
        <AddNew selectRef={this.select} maxLength={50} onAdd={this.add}/>
      </>
    );
  };

  render() {
    const { placeholder } = this.props;
    const { data, value, editing } = this.state;

    return (
      <Select
        ref={(el) => this.select = el}
        placeholder={placeholder}
        allowClear
        showSearch
        optionLabelProp="value"
        value={value}
        onChange={(value) => this.setState({value})}
        filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        dropdownRender={this.dropdownRender}
        defaultOpen={true}
      >
        {data.map((item) => (
          <Select.Option key={item.id} value={item.name} >
            <Option
              item={item}
              selectRef={this.select}
              setEditing={this.setEditing}
              remove={this.remove}
              editing={editing}
              update={this.update}
            />
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default DropdownPicker;