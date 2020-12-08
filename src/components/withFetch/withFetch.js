import React from 'react';

const withFetch = (Component) => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        error: null,
      };

      this.fetch = this.fetch.bind(this);
    }

    fetch(fetcher) {
      this.setState({
        error: null,
        loading: true,
      });

      return fetcher()
        .then((res) => res?.data)
        .catch((err) => {
          this.setState({ error: err.response?.data?.message });
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