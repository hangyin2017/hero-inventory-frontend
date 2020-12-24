import React from 'react';
import auth from '../../apis/auth';

const withAuthentication = (Component) => {

  class AuthenticationProvider extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        user: null,
      }

      this.setUser = this.setUser.bind(this);
    }
    
      componentDidMount() {
        auth.get()
          .then((res) => this.setUser(res.data))
          .catch((e) => {});
      }
    
      setUser(user) {
        this.setState({ user });
      }

      render() {
        const { user } = this.state;

        return (
          <Component
            {...this.props}
            user={user}
            setUser={this.setUser}
          />
        );
      }
  }

  return AuthenticationProvider;
}

export default withAuthentication;