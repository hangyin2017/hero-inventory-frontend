import React from 'react';

const withModal = (Component) => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        visible: false,
      };

      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
    }

    showModal() {
      this.setState({ visible: true });
    }
  
    hideModal() {
      this.setState({ visible: false });
    }

    render() {
      const { visible } = this.state;

      return (
        <Component
          {...this.props}
          modalVisible={visible}
          showModal={this.showModal}
          hideModal={this.hideModal}
        />
      );
    }
  }

  return Wrapper;
}

export default withModal;