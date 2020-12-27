import React from 'react';
import { Redirect } from 'react-router-dom';
import LoadingApp from '../../pages/LoadingApp';
import withAuthentication from '../withAuthentication';
import compose from '../../utils/compose';
import { AUTH_ROUTE } from '../../Routes';

const permitted = (permissions, authentication) => {
  if(!!permissions && permissions.indexOf(authentication.user.role) < 0 ) {
    return false;
  }
  return true;
};

class Guard extends React.Component {
  render() {
    const { authentication, permissions, location, children } = this.props;

    if(authentication.loading) {
      return <LoadingApp />;
    }

    if(!authentication.user) {
      return (
        <Redirect to={{
          pathname: AUTH_ROUTE.path,
          state: { from: location },
        }} />
      );
    }

    if(!permitted(permissions, authentication)) {
      console.log(`${authentication.user.role} does not have access to this page`);
      return null;
    }

    return children;
  }
}

const EnhancedGuard = compose(
  withAuthentication,
)(Guard);

EnhancedGuard.permitted = permitted;

export default EnhancedGuard;