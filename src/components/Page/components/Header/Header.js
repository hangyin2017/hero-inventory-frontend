import React from 'react';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import NewButton from './components/NewButton';

const StyledHeader = styled.div`
border-bottom: 1px solid #dadada;
padding: 10px 14px;
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
  hasNewButton,
  hasSearchBar,
  searchBarProps,
  onNewButtonClick,
}) => {

  return (
    <StyledHeader>
      <Layout>
        <Left>
          <h2>{title}</h2>
        </Left>
        <Right>
          {hasSearchBar && (
            <SearchBar {...searchBarProps} />
          )}
          {hasNewButton && (
            <NewButton onClick={onNewButtonClick} />
          )}
        </Right>
      </Layout>
    </StyledHeader>
  );
};

export default Header;