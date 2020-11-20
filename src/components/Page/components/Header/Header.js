import React from 'react';
import styled from 'styled-components';
import { Button, Input } from 'antd';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: inherit;
  border-bottom: 1px solid #dadada;
  padding: 20px 14px 12px;
  text-align: left;
`;

const Left = styled.div`

`;

const Right = styled.div`

`;


const { Search } = Input;
const SearchBar = styled(Search)`
  width: 250px;
`;

const Header = ({
  title,
  searchBarPlaceHolder,
  onSearchBarChange,
  onSearchBarSearch,
  onNew
}) => {
  return (
    <StyledHeader>
      <Left>
        <h2>{title}</h2>
      </Left>
      <Right>
        <SearchBar
          placeholder={searchBarPlaceHolder}
          allowClear={true}
          onChange={onSearchBarChange}
          onSearch={onSearchBarSearch}
        />
        <Button type="primary" onClick={onNew}>
          + New
        </Button>
      </Right>
    </StyledHeader>
  );
};

export default Header;