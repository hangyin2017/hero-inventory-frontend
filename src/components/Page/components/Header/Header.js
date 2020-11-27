import React from 'react';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import NewButton from './components/NewButton';
import ItemDetailButton from './components/ItemDetailButton';

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
  searchBarProps,
  newButtonProps,
  itemDetailButtonProps,
}) => {
  return (
    <StyledHeader>
      <Layout>
        <Left>
          <h2>{title}</h2>
        </Left>
        <Right>
          {searchBarProps && (
            <SearchBar {...searchBarProps} />
          )}
          {newButtonProps && (
            <NewButton {...newButtonProps} />
          )}
          {itemDetailButtonProps && (
            <ItemDetailButton {...itemDetailButtonProps} />
          )}
        </Right>
      </Layout>
    </StyledHeader>
  );
};

export default Header;