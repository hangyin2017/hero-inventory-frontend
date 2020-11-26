import React from 'react';
import { Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import AddNew from './components/AddNew';
import Option from './components/Option';

const StyledSelect = styled(Select)`
  .dropdown {
    position: absolute;
  }
`;

class DropdownPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: null,
    };

    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
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

  delete(id) {
    const { api } = this.props;
    api.delete(id)
      .then((res) => this.setState((prevState) => {
        data = prevState.data.filter();
        return { data: [...prevState.data, res.data] };
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
    const { placeholder, ...selectProps } = this.props;
    const { data, value } = this.state;

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
          <Select.Option key={item.id} value={item.name}
            // onMouseOver={(e) => console.log(e.target.value)}
          >
            <Option
              item={item}
              onDelete={this.delete}
              active={value}
            />
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default DropdownPicker;