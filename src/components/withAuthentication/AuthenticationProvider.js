import React from 'react';
import auth from '../../apis/auth';
import AuthenticationContext from './AuthenticationContext'
import withFetch from '../withFetch';
import compose from '../../utils/compose';

const localStorageToken = process.env.REACT_APP__LOCALSTORAGE_TOKEN_NAME;

class AuthenticationProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    }

    this.setUser = this.setUser.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  
  componentDidMount() {
    this.getAuth();
  }

  getAuth() {
    const { fetch } = this.props;

    fetch(() => auth.get().then((res) => this.setUser(res.data)))
      .catch((e) => {});
  }

  setUser(user) {
    this.setState({ user });
  }

  signOut() {
    this.setUser(null);
    localStorage.removeItem(localStorageToken);
  }

  render() {
    const { loading, children } = this.props;
    const { user } = this.state;

    const value = {
      user,
      setUser: this.setUser,
      signOut: this.signOut,
      loading,
    }

    return (
      <AuthenticationContext.Provider value={value}>
        {children}
      </AuthenticationContext.Provider>
    );
  }
}

const EnhancedAuthenticationProvider = compose(
  withFetch(true),
)(AuthenticationProvider);

export default EnhancedAuthenticationProvider;