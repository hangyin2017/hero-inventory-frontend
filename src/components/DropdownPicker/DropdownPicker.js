import React from 'react';
import { Select, Spin } from 'antd';
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
      loading: false,
    };

    this.setEditing = this.setEditing.bind(this);
    this.request = this.request.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.refreshAll = this.refreshAll.bind(this);
    this.dropdownRender = this.dropdownRender.bind(this);
  }

  componentDidMount() {
    this.refreshAll();
  }

  request(method) {  
    return async (...args) => {
      this.setState({ loading: true });

      await method(...args);

      this.setState({ loading: false });
    }
  }

  async refreshAll() {
    const { api } = this.props;
    const { data } = await api.getAll();
    
    this.setState({ data });
  }

  setEditing(id) {
    this.setState({ editing: id });
  }

  async add(value) {
    const { api } = this.props;

    await api.add({ name: value }).then(this.refreshAll);

    this.setState({ value });
  }

  async update(item, value) {
    const { api } = this.props;

    await api.update(item.id, { name: value }).then(this.refreshAll);
    
    this.setState({ value });
  }

  async remove(item) {
    const { api } = this.props;
    const { value } = this.state;

    await api.remove(item.id).then(this.refreshAll);

    item.name == value && this.setState({ value: null });
  }

  dropdownRender(options) {
    const { loading } = this.state;

    return (
      <Spin spinning={loading}>
        {options}
        <AddNew selectRef={this.select} maxLength={50} request={this.request} onAdd={this.add}/>
      </Spin>
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
              editing={editing}
              setEditing={this.setEditing}
              request={this.request}
              onRemove={this.remove}
              onUpdate={this.update}
            />
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default DropdownPicker;