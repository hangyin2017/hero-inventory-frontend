import React from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import AddNew from './components/AddNew';

const StyledSelect = styled(Select)`
  .dropdown {
    position: absolute;
  }
`;

const Dropdown = (options) => {
  const { Option } = Select;

  return (
    <>
      {options}
      <AddNew />
    </>
  );
};

class DropdownPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const { dataSource } = this.props;
    const { data } = await dataSource();
    this.setState({ data });
  }

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
        dropdownRender={Dropdown}
        {...selectProps}
      >
        {data.map((brand) => (
          <Option value={brand.name}>{brand.name}</Option>
        ))}
      </Select>
    );
  }
}

export default DropdownPicker;