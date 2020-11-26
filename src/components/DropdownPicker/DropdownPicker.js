import React from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  .dropdown {
    position: absolute;
  }
`;

// const Dropdown = (_, data) => {
//   const { Option } = Select;
//   console.log(data[1].name)

//   return (
//     <>
//       {data.map((brand) => (
//         <input value={brand.name}>{brand.name}</input>
//       ))}
//     </>
//   );
// };
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
        // dropdownRender={(menu) => {Dropdown(menu, data)}}
        {...selectProps}
      >
        {/* {data.map((brand) => (
          <Option value={brand.name}>{brand.name}</Option>
        ))} */}
      </Select>
    );
  }
}

export default DropdownPicker;