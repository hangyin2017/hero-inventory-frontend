import React from 'react';
import auth from '../../apis/auth';
import AuthenticationContext from './AuthenticationContext'
import withFetch from '../withFetch';

const withAuthenticationProvider = (Component) => {

  class AuthenticationProvider extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        user: null,
      }

      this.setUser = this.setUser.bind(this);
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

      render() {
        const { user } = this.state;

        return (
          <AuthenticationContext.Provider value={{user, setUser: this.setUser}}>
            <Component {...this.props} />
          </AuthenticationContext.Provider>
        );
      }
  }

  return withFetch(true)(AuthenticationProvider);
}

export default withAuthenticationProvider;