import React from 'react';
import auth from '../../apis/auth';
import withFetch from '../../components/withFetch'

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
          <Component
            {...this.props}
            user={user}
            setUser={this.setUser}
          />
        );
      }
  }

  return withFetch(true)(AuthenticationProvider);
}

export default withAuthentication;