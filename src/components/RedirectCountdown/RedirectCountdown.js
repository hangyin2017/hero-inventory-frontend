import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';

class RedirectCountdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      second: this.props.seconds,
    }

    this.countdown = this.countdown.bind(this);
  }

  componentDidMount() {
    this.countdown();
  }

  countdown() {
    if(this.state.second > 0 ) {
      clearTimeout(this.redirectTimer);
      this.redirectTimer = setTimeout(() => {
        this.subtractSecond();
        this.countdown();
      }, 1000);
    }
  }

  subtractSecond() {
    this.setState((prevState) => {
      return { second: prevState.second - 1 };
    });
  }

  render() {
    const { to } = this.props;
    const { second } = this.state;

    return (
      <>
        <div>Redirecting in {second} seconds</div>
        {/* {second === 0 && <Redirect to={to} />} */}
      </>
    ); 
  }
}

export default RedirectCountdown;