import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

const Wrapper = styled.div`
  width: 300px;
`;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    }
  }

  render() {
    const { Search } = Input;
    const {
      placeholder,
      onChange,
      onSearch,
    } = this.props;

    return (
      <Wrapper>
        <Search
          placeholder={placeholder}
          allowClear={true}
          onChange={onChange}
          onSearch={onSearch}
        />
      </Wrapper>
    )
  }
}

export default SearchBar;