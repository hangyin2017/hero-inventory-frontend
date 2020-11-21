import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    }
  }

  SearchBar = styled.div`
    width: 250px;
  `;

  render() {
    const { Search } = Input;
    const {
      searchBarPlaceHolder,
      onSearchBarChange,
      onSearchBarSearch,
    } = this.props;

    return (
      <SearchBar>
        <Search
          placeholder={searchBarPlaceHolder}
          allowClear={true}
          onChange={onSearchBarChange}
          onSearch={onSearchBarSearch}
        />
      </SearchBar>
    )
  }
}

export default SearchBar;