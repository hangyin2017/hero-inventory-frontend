import React from 'react';
import { Redirect } from 'react-router-dom';
import LoadingApp from '../../pages/LoadingApp';
import withAuthentication from '../withAuthentication';
import compose from '../../utils/compose';
import { AUTH_ROUTE } from '../../Routes';


class Guard extends React.Component {
  componentDidMount() {
    this.preCheck();
  }

  preCheck() {
    const { authentication, loading } = this.props;

    if(loading) {
      return;
    }

    if(!authentication.user) {
      return (<Redirect to={{
        pathname: AUTH_ROUTE.path,
        state: { from: props.location },
      }} />);
    }
  }

  render() {
    const { authentication, loading, children } = this.props;

    if(loading) {
      return <LoadingApp />;
    }

    if(!authentication.user) {
      return (
        <Redirect to={{
          pathname: AUTH_ROUTE.path,
          state: { from: props.location },
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