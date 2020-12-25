import React from 'react';
import AuthenticationContext from './AuthenticationContext'

const withAuthentication = (Component) => (props) => {
  return (
    <AuthenticationContext.Consumer>
      {(authentication) => (
        <Component {...props} authentication={authentication} />
      )}
    </AuthenticationContext.Consumer>
  );
}

export default withAuthentication;