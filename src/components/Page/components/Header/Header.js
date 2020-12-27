import React from 'react';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import NewButton from './components/NewButton';
import Guard from '../../../Guard';
import withAuthentication from '../../../withAuthentication';
import compose from '../../../../utils/compose';

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

const newButtonPermissions = ['admin', 'sales'];

const Header = ({
  title,
  hasNewButton,
  hasSearchBar,
  searchBarProps,
  onNewButtonClick,
  authentication,
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
            <NewButton
              onClick={onNewButtonClick}
              disabled={!Guard.permitted(newButtonPermissions, authentication)}
            />
          )}
        </Right>
      </Layout>
    </StyledHeader>
  );
};

const EnhancedHeader = compose(
  withAuthentication,
)(Header);

export default EnhancedHeader;