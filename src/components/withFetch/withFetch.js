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
          const errorMessage = {
            401: 'Username and password do not match, please try again',
          }[err.response?.status] || err.response?.data?.message;
          this.setError(errorMessage || 'Unknown network error');
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