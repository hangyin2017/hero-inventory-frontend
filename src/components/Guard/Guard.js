import React from 'react';
import { Redirect } from 'react-router-dom';
import LoadingApp from '../../pages/LoadingApp';
import withAuthentication from '../withAuthentication';
import compose from '../../utils/compose';
import { AUTH_ROUTE } from '../../Routes';

class Guard extends React.Component {
  render() {
    const { authentication, location, children } = this.props;

    console.log('loading', authentication.loading);
    console.log('user', authentication.user);
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

    return children;
  }
}

const EnhancedGuard = compose(
  withAuthentication,
)(Guard);

export default EnhancedGuard;