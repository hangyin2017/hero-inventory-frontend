import React from 'react';

const withFetch = (initialLoading = false) => (Component) => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: initialLoading,
        error: null,
      };

      this.fetch = this.fetch.bind(this);
    }

    setError(error) {
      this.setState({ error });
    }

    fetch(fetcher) {
      this.setState({
        error: null,
        loading: true,
      });

      return fetcher()
        .then((res) => res?.data)
        .catch((err) => {
          const {error} = this.state;
          const errorMessage = {
            401: 'Email and password does not match, please try again',
          }[err.response?.status] || err.response?.data?.message;
          this.setError(errorMessage || 'Unknown error');
          throw err;
        })
        .finally(() => this.setState({ loading: false }));
    }

    render() {
      const { loading, error } = this.state;

      return (
        <Component
          {...this.props}
          loading={loading}
          error={error}
          fetch={this.fetch}
        />
      );
    }
  }

  return Wrapper;
}

export default withFetch;