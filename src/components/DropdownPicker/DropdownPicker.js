import React from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import AddNew from './components/AddNew';
import axios from 'axios';

const StyledSelect = styled(Select)`
  .dropdown {
    position: absolute;
  }
`;

const Dropdown = (options) => {
  return (
    <>
      {options}
      <AddNew onAdd={this.add}/>
    </>
  );
};

class DropdownPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.add = this.add.bind(this);
    this.dropdownRender = this.dropdownRender.bind(this);
  }

  async componentDidMount() {
    const { api } = this.props;
    const { data } = await api.getAll();
    this.setState({ data });
  }

  add(value) {
    const { api } = this.props;
    api.add({ name: value })
      .then((res) => this.setState((prevState) => {
        return { data: [...prevState.data, res.data] }
      }));
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
    const { Option } = Select;
    const { placeholder, ...selectProps } = this.props;
    const { data } = this.state;

    return (
      <Select
        placeholder={placeholder}
        allowClear
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        dropdownRender={this.dropdownRender}
        {...selectProps}
      >
        {data.map((item) => (
          <Option key={item.id} value={item.name}>{item.name}</Option>
        ))}
      </Select>
    );
  }
}

export default DropdownPicker;