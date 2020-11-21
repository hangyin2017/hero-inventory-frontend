import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import SearchBar from './components/SearchBar';

const StyledHeader = styled.div`
  border-bottom: 1px solid #dadada;
  padding: 20px 14px 12px;
`;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
`;

const Right = styled.div`
  display: flex;

  & > * {
      margin: 0 10px;
    }
`;

const Header = ({
  title,
  searchBarPlaceholder,
  onSearchBarChange,
  onSearchBarSearch,
  onNew
}) => {
  return (
    <StyledHeader>
      <Layout>
        <Left>
          <h2>{title}</h2>
        </Left>
        <Right>
          <SearchBar
            placeholder={searchBarPlaceholder}
            onChange={onSearchBarChange}
            onSearch={onSearchBarSearch}
          />
          <Button type="primary" onClick={onNew}>
            + New
          </Button>
        </Right>
      </Layout>
    </StyledHeader>
  );
};

export default Header;